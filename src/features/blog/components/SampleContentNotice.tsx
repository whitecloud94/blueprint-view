import { Info } from 'lucide-react';
import { COMMON_STYLES } from '../../../constants/styles';

/**
 * 블로그 글이 아직 포트폴리오 시연용 샘플임을 방문자에게 고지하는 안내 스트립.
 *
 * <p>블로그의 기능(작성·댓글·좋아요·조회수)은 실제 API 로 동작하지만, 일부 글의
 * 내용은 데모를 위해 채워 둔 것이다. 면접관·독자가 이를 실제 발행 글로 오인하지
 * 않도록 고지한다.
 *
 * <p><b>노출 조건</b>은 글 단위다. 서버의 {@code post.sample} 이 true 인 글에만
 * 붙는다. 상세 페이지는 해당 글이 샘플일 때, 목록 페이지는 현재 목록에 샘플 글이
 * 하나라도 있을 때 호출부가 이 컴포넌트를 렌더한다. 샘플 여부 토글은 DB 에서 한다
 * (에디터 UI 없음).
 *
 * <p><b>제거 방법</b>
 * <ol>
 *   <li>일시적으로 전부 끄려면 {@link NOTICE_ENABLED} 를 false 로 둔다.
 *   <li>샘플 글이 모두 사라지면 이 파일과, 렌더하는 두 곳(BlogListPage,
 *       PostDetailPage)의 import·호출, 그리고 스키마의 {@code sample} 필드를 정리한다.
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
