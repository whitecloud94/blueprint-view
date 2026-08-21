import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { ERROR_ACTION_STYLES, ErrorState } from '../components/common/feedback/ErrorState';

/**
 * 404 화면.
 *
 * <p>이전에는 일치하는 라우트가 없으면 아무것도 렌더링되지 않아 빈 화면이 남았다.
 * 방문자가 오타나 오래된 링크로 들어왔을 때 길을 잃지 않도록 복구 동선을 준다.
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageTransition direction="none">
      <div className="w-full flex justify-center px-4 py-16 sm:py-24">
        <ErrorState
          icon={Compass}
          code="404"
          label="NOT FOUND"
          title="페이지를 찾을 수 없습니다"
          description="주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 이어서 둘러보실 수 있습니다."
          actions={
            <>
              <button type="button" onClick={() => navigate('/')} className={ERROR_ACTION_STYLES.primary}>
                홈으로
              </button>
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className={ERROR_ACTION_STYLES.secondary}
              >
                블로그 보기
              </button>
            </>
          }
        />
      </div>
    </PageTransition>
  );
}
