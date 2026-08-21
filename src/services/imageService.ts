import axiosInstance from '../api/axiosInstance';

/** 업로드 응답. url 은 호스트를 뺀 경로다. */
export interface ImageUploadResult {
  url: string;
  size: number;
}

/** 이미지 업로드는 본문 저장보다 오래 걸릴 수 있어 기본 타임아웃(10초)을 늘린다. */
const UPLOAD_TIMEOUT_MS = 30_000;

export const imageService = {
  upload: async (file: File): Promise<ImageUploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axiosInstance.post<ImageUploadResult>('/images', formData, {
      // 인스턴스 기본값이 application/json 이라 그대로 두면 multipart 경계 문자열이
      // 빠진다. 헤더를 지워 브라우저가 boundary 를 포함해 직접 설정하게 한다.
      headers: { 'Content-Type': undefined },
      timeout: UPLOAD_TIMEOUT_MS,
    });

    return data;
  },
};
