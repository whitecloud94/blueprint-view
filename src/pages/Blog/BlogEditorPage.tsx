import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm, type SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GLASS_STYLES } from '../../constants/styles';
import EditorPanel from '../../features/blog/editor/EditorPanel';
import EditorPreview from '../../features/blog/editor/EditorPreview';
import { EditorHeader } from '../../features/blog/editor/EditorHeader';
import { useDraftAutosave } from '../../features/blog/editor/useDraftAutosave';
import {
  postFormSchema,
  postWriteRequestSchema,
  type PostFormData,
  type PostStatus,
} from '../../schemas/postSchema';
import { postService } from '../../services/postService';
import { getAxiosErrorMessage } from '../../api/axiosInstance';
import { useToast } from '../../hooks/useToast';
import { LiquidToast } from '../../components/common/feedback/LiquidToast';
import { useErrorActions } from '../../store/useErrorStore';
import { LoadingBar } from '../../components/common/LoadingBar';

type EditorMode = 'edit' | 'preview' | 'split';

const defaultValues: PostFormData = {
  titleName: '',
  content: '',
  excerpt: '',
};

/**
 * 글 작성/수정 화면.
 *
 * <p>경로에 id 가 있으면 수정, 없으면 작성이다. 두 흐름은 초기값을 어디서
 * 가져오는지와 저장 시 호출하는 API 만 다르고 편집 경험은 동일하므로 한
 * 컴포넌트로 둔다.
 */
export default function BlogEditorPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isVisible, message, showToast } = useToast();
  const { showError } = useErrorActions();

  const postId = id ? Number(id) : undefined;
  const isEditMode = postId !== undefined;

  const [mode, setMode] = useState<EditorMode>('split');
  const [isLoading, setIsLoading] = useState(isEditMode);

  const methods = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const { clearDraft } = useDraftAutosave(methods, !isEditMode);

  // 수정 모드에서는 서버의 현재 내용을 초기값으로 불러온다.
  useEffect(() => {
    if (postId === undefined) return;

    if (!Number.isInteger(postId) || postId <= 0) {
      showToast('잘못된 주소입니다.');
      navigate('/blog', { replace: true });
      return;
    }

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const post = await postService.getPostById(postId);
        reset({
          titleName: post.titleName,
          content: post.content,
          excerpt: post.excerpt ?? '',
        });
      } catch (error) {
        showToast(getAxiosErrorMessage(error, '글을 불러오지 못했습니다.'));
        navigate('/blog', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPost();
  }, [postId, reset, navigate, showToast]);

  const onInvalid: SubmitErrorHandler<PostFormData> = (formErrors) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) {
      showToast(firstError.message);
    }
  };

  /**
   * 저장 핸들러를 발행 상태별로 만든다.
   *
   * <p>writer 는 보내지 않는다. 서버가 인증된 토큰의 주체로 결정하며, 클라이언트가
   * 보낸 값은 무시된다.
   */
  const submitWith = (status: PostStatus) =>
    handleSubmit(async (data: PostFormData) => {
      try {
        // 요약을 비워 보내도 서버가 본문 앞부분으로 채운다. 같은 규칙을 양쪽에
        // 두면 한쪽만 바뀌었을 때 결과가 갈린다.
        const payload = postWriteRequestSchema.parse({ ...data, status });

        const saved = isEditMode
          ? await postService.updatePost(postId, payload)
          : await postService.addPost(payload);

        clearDraft();
        reset(defaultValues);
        navigate(`/blog/${saved.postId}`, { replace: true });
      } catch (error) {
        // 저장 실패는 하려던 일이 통째로 무산된 상황이다. 사라지는 토스트로는
        // 놓치기 쉽고, 작성 중인 글을 두고 무엇을 할지 결정해야 한다.
        showError(error, {
          fallbackTitle: '저장하지 못했습니다',
          onRetry: () => void submitWith(status)(),
        });
      }
    }, onInvalid);

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#121212] pb-20">
        <EditorHeader
          mode={mode}
          setMode={setMode}
          isEditMode={isEditMode}
          onSaveDraft={submitWith('DRAFT')}
          onPublish={submitWith('PUBLISHED')}
          isSubmitting={isSubmitting}
        />

        <main className="max-w-[1600px] mx-auto mt-4 px-6">
          <AnimatePresence mode="wait">
            {mode === 'split' ? (
              <motion.div
                key="split-pane"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-140px)]"
              >
                <EditorPanel
                  className={`${GLASS_STYLES.card} bg-white/70 dark:bg-white/[0.04]`}
                  isCompact
                  onError={showToast}
                />
                <EditorPreview
                  className={`${GLASS_STYLES.card} bg-white/80 dark:bg-white/[0.05]`}
                  showLiveBadge
                />
              </motion.div>
            ) : mode === 'edit' ? (
              <motion.div
                key="edit-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col"
              >
                <EditorPanel
                  className={`${GLASS_STYLES.card} bg-white/70 dark:bg-white/[0.04] h-full`}
                  onError={showToast}
                />
              </motion.div>
            ) : (
              <motion.div
                key="preview-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col"
              >
                <EditorPreview className={`${GLASS_STYLES.card} bg-white/80 dark:bg-white/[0.05] h-full`} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <LiquidToast isVisible={isVisible} message={message} variant="error" />
    </FormProvider>
  );
}
