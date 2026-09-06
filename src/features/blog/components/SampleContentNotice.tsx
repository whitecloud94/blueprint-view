import { Info } from 'lucide-react';
import { COMMON_STYLES } from '../../../constants/styles';

/**
 * 블로그 글이 아직 포트폴리오 시연용 샘플임을 방문자에게 고지하는 안내 스트립.
 *
 * <p>블로그의 기능(작성·댓글·좋아요·조회수)은 실제 API 로 동작하지만, 글 내용은
 * 데모를 위해 채워 둔 것이다. 면접관·독자가 이를 실제 발행 글로 오인하지 않도록
 * 목록과 상세 양쪽에 같은 문구로 노출한다.
 *
 * <p><b>제거 방법</b>
 * <ol>
 *   <li>직접 쓴 글로 교체하기 시작하면 {@link NOTICE_ENABLED} 를 false 로 둔다.
 *   <li>교체가 끝나면 이 파일과, 이 컴포넌트를 렌더하는 두 곳
 *       (BlogListPage, PostDetailPage)의 import·호출을 삭제한다.
 * </ol>
 */
const NOTICE_ENABLED = true;

interface SampleContentNoticeProps {
  /** 배치되는 화면마다 간격이 달라 여백은 호출부에서 준다. */
  className?: string;
}

export const SampleContentNotice = ({ className = '' }: SampleContentNoticeProps) => {
  if (!NOTICE_ENABLED) return null;

  return (
    <div
      role="note"
      className={`${COMMON_STYLES.glassMuted} flex items-start gap-2.5 rounded-2xl px-4 py-3 ${className}`}
    >
      <Info size={15} className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
      <p className="text-[13px] leading-relaxed font-medium text-gray-500 dark:text-gray-400">
        게시글은 포트폴리오 시연을 위한{' '}
        <strong className="font-bold text-gray-700 dark:text-gray-300">샘플 콘텐츠</strong>입니다.
        작성·댓글·좋아요·조회수 등 기능은 실제 API로 동작합니다.
      </p>
    </div>
  );
};
