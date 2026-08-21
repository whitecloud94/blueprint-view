import axios from 'axios';
import { ZodError } from 'zod';

/**
 * 화면에 보여줄 오류의 표준 형태.
 *
 * @property code        분류 코드. 서버 도메인 코드이거나 클라이언트 분류값이다.
 * @property title       무슨 일이 일어났는지 (한 줄)
 * @property description 사용자가 다음에 무엇을 할 수 있는지
 * @property traceId     서버 로그 대조용 식별자. 5xx 에서만 내려온다.
 * @property retryable   같은 동작을 다시 시도해 볼 만한지
 * @property requiresAuth 로그인이 필요한 상태인지
 */
export interface AppError {
  code: string;
  title: string;
  description: string;
  traceId?: string;
  retryable: boolean;
  requiresAuth: boolean;
}

/** 서버가 내려주는 오류 응답 규격. 백엔드 ErrorResponse 와 짝을 이룬다. */
interface ServerErrorResponse {
  code?: string;
  message?: string;
  status?: number;
  traceId?: string;
  errors?: { field: string; message: string }[];
}

const DEFAULT_TITLE = '요청을 처리하지 못했습니다';

/**
 * 상태 코드별 제목.
 *
 * 제목은 상황 요약이고, 설명은 서버가 준 사용자 문구를 그대로 쓴다.
 * 서버 문구는 이미 사용자가 읽을 수 있게 작성돼 있으므로 클라이언트가 다시 쓰지 않는다.
 */
const TITLE_BY_STATUS: Record<number, string> = {
  400: '입력을 확인해주세요',
  401: '다시 로그인해주세요',
  403: '권한이 없습니다',
  404: '찾을 수 없습니다',
  409: '이미 처리된 요청입니다',
  413: '파일이 너무 큽니다',
  422: '입력을 확인해주세요',
};

/**
 * 어떤 예외든 사용자에게 보여줄 수 있는 형태로 변환한다.
 *
 * <p>원칙은 하나다. **예외의 원문 메시지를 화면에 그대로 올리지 않는다.**
 * ZodError.message 는 issue 배열을 JSON 으로 직렬화한 문자열이고, 네트워크 오류는
 * 'Network Error' 처럼 사용자가 조치할 수 없는 문구다. 서버가 사용자용으로 작성한
 * message 만 신뢰하고, 나머지는 분류에 따른 문구로 바꾼다.
 *
 * <p>원문은 버리지 않고 콘솔에 남긴다. 디버깅에 필요한 정보와 사용자에게 보여줄
 * 정보는 다르다.
 */
export function toAppError(error: unknown, fallbackTitle: string = DEFAULT_TITLE): AppError {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return {
        code: 'NETWORK',
        title: '서버에 연결할 수 없습니다',
        description: '네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.',
        retryable: true,
        requiresAuth: false,
      };
    }

    const { status } = error.response;
    const body = parseServerError(error.response.data);

    return {
      code: body?.code ?? `HTTP_${status}`,
      title: TITLE_BY_STATUS[status] ?? (status >= 500 ? '일시적인 오류가 발생했습니다' : fallbackTitle),
      description: body?.message ?? describeByStatus(status),
      traceId: body?.traceId,
      retryable: status >= 500 || status === 408 || status === 429,
      requiresAuth: status === 401,
    };
  }

  if (error instanceof ZodError) {
    // 서버 계약이 어긋난 상황이다. 사용자는 손쓸 수 없고, 개발자는 상세가 필요하다.
    console.error('응답 스키마 불일치:', error.issues);
    return {
      code: 'SCHEMA_MISMATCH',
      title: '예상치 못한 응답을 받았습니다',
      description: '서버 응답 형식이 달라 처리하지 못했습니다. 잠시 후 다시 시도해주세요.',
      retryable: true,
      requiresAuth: false,
    };
  }

  console.error('처리되지 않은 오류:', error);
  return {
    code: 'UNKNOWN',
    title: fallbackTitle,
    description: '예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    retryable: true,
    requiresAuth: false,
  };
}

/** 토스트처럼 한 줄만 보여주는 자리에서 쓸 요약 문구. */
export function toErrorMessage(error: unknown, fallbackTitle?: string): string {
  return toAppError(error, fallbackTitle).description;
}

function parseServerError(data: unknown): ServerErrorResponse | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  const body = data as ServerErrorResponse;
  // message 가 없으면 우리 규격이 아니다. 다른 형태를 억지로 읽어 화면에 올리지 않는다.
  return typeof body.message === 'string' && body.message.length > 0 ? body : null;
}

function describeByStatus(status: number): string {
  if (status >= 500) {
    return '서버에서 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.';
  }
  if (status === 401) {
    return '로그인 정보가 만료되었습니다.';
  }
  return '요청을 처리할 수 없습니다. 입력한 내용을 확인해주세요.';
}
