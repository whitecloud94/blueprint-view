import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  useForm,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GLASS_STYLES } from '../../constants/styles';
import EditorPanel from '../../features/blog/editor/EditorPanel';
import EditorPreview from '../../features/blog/editor/EditorPreview';
import { EditorHeader } from '../../features/blog/editor/EditorHeader';
import {
  postFormSchema,
  postSaveRequestSchema,
  type PostFormData,
} from '../../schemas/postSchema';
import { postService } from '../../services/postService';
import { getAxiosErrorMessage } from '../../api/axiosInstance';

const DRAFT_KEY = 'blog-draft';

const defaultValues: PostFormData = {
  titleName: '',
  content: '',
  excerpt: '',
};

function loadDraft(): PostFormData | null {
  const saved = localStorage.getItem(DRAFT_KEY);
  if (!saved) return null;
  try {
    const parsed = postFormSchema.safeParse(JSON.parse(saved));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export default function BlogEditorPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split');

  const methods = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const { handleSubmit, reset, watch } = methods;

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      reset(draft);
    }
  }, [reset]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const subscription = watch((values) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      }, 500);
    });
    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [watch]);

  const onValid = async (data: PostFormData) => {
    try {
      const payload = postSaveRequestSchema.parse({
        ...data,
        excerpt: data.excerpt?.trim() || data.content.slice(0, 200),
        boardStatusCode: '01',
      });
      await postService.addPost(payload);
      localStorage.removeItem(DRAFT_KEY);
      reset(defaultValues);
      navigate('/blog');
    } catch (error) {
      alert(getAxiosErrorMessage(error, '포스트 저장에 실패했습니다.'));
    }
  };

  const onInvalid: SubmitErrorHandler<PostFormData> = (formErrors) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) {
      alert(firstError.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-[#F3F3F3] pb-20">
        <EditorHeader
          mode={mode}
          setMode={setMode}
          onSave={handleSubmit(onValid, onInvalid)}
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
                  className={`${GLASS_STYLES.card} bg-white/70`}
                  isCompact
                />
                <EditorPreview
                  className={`${GLASS_STYLES.card} bg-white/80`}
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
                <EditorPanel className={`${GLASS_STYLES.card} bg-white/70 h-full`} />
              </motion.div>
            ) : (
              <motion.div
                key="preview-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col"
              >
                <EditorPreview className={`${GLASS_STYLES.card} bg-white/80 h-full`} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </FormProvider>
  );
}