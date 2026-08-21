import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImagePlus, Loader2 } from 'lucide-react';
import type { PostFormData } from '../../../schemas/postSchema';
import { useImageUpload } from './useImageUpload';

interface EditorPaneProps {
  className?: string;
  isCompact?: boolean;
  /** 이미지 업로드 실패 등 사용자에게 알릴 내용. 토스트는 페이지가 소유한다. */
  onError?: (message: string) => void;
}

const EditorPanel = ({ className = '', isCompact = false, onError }: EditorPaneProps) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<PostFormData>();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref: registerContentRef, ...contentField } = register('content');

  const { isUploading, isDraggingOver, handlePaste, handleDrop, handleDragOver, handleDragLeave } =
    useImageUpload({
      textareaRef,
      getContent: () => getValues('content'),
      setContent: (value) => setValue('content', value, { shouldDirty: true }),
      onError,
    });

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      <div
        className={`${isCompact ? 'p-6' : 'p-8'} space-y-6 shrink-0 border-b border-gray-100 dark:border-white/10`}
      >
        <input
          type="text"
          id="titleName"
          placeholder="Enter post title..."
          aria-invalid={Boolean(errors.titleName)}
          {...register('titleName')}
          className={`w-full ${
            isCompact ? 'text-2xl' : 'text-4xl'
          } font-black bg-transparent border-none outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white`}
        />
        {errors.titleName && (
          <p className="text-xs text-red-500" role="alert">
            {errors.titleName.message}
          </p>
        )}
      </div>

      <div
        className={`relative flex-1 overflow-y-auto ${isCompact ? 'p-6' : 'px-8 pb-8'} custom-scrollbar`}
      >
        <textarea
          id="content"
          placeholder="Write your story using Markdown..."
          aria-invalid={Boolean(errors.content)}
          {...contentField}
          ref={(element) => {
            // react-hook-form 의 ref 와 커서 제어용 ref 를 함께 연결한다.
            registerContentRef(element);
            textareaRef.current = element;
          }}
          onPaste={handlePaste}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full h-full bg-transparent border-none outline-none resize-none text-lg leading-relaxed text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 min-h-[400px] font-mono transition-colors ${
            isDraggingOver ? 'bg-indigo-50/60 dark:bg-indigo-500/10 rounded-2xl' : ''
          }`}
        />

        {errors.content && (
          <p className="text-xs text-red-500 mt-2" role="alert">
            {errors.content.message}
          </p>
        )}

        {/* 붙여넣기/드래그가 가능하다는 사실은 눈에 보이지 않으면 알 수 없다. */}
        <div
          className="sticky bottom-0 flex items-center gap-1.5 pt-3 text-[11px] font-medium text-gray-400 dark:text-gray-500"
          aria-live="polite"
        >
          {isUploading ? (
            <>
              <Loader2 size={13} className="animate-spin" aria-hidden="true" />
              이미지 업로드 중...
            </>
          ) : (
            <>
              <ImagePlus size={13} aria-hidden="true" />
              이미지를 붙여넣거나 끌어다 놓으면 본문에 삽입됩니다
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditorPanel);
