import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { PostFormData } from '../../../schemas/postSchema';

interface EditorPaneProps {
  className?: string;
  isCompact?: boolean;
}

const EditorPanel = ({ className = '', isCompact = false }: EditorPaneProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostFormData>();

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      <div className={`${isCompact ? 'p-6' : 'p-8'} space-y-6 shrink-0 border-b border-gray-100`}>
        <input
          type="text"
          id="titleName"
          placeholder="Enter post title..."
          aria-invalid={Boolean(errors.titleName)}
          {...register('titleName')}
          className={`w-full ${
            isCompact ? 'text-2xl' : 'text-4xl'
          } font-black bg-transparent border-none outline-none placeholder:text-gray-300 text-gray-900`}
        />
        {errors.titleName && (
          <p className="text-xs text-red-500" role="alert">
            {errors.titleName.message}
          </p>
        )}
      </div>

      <div className={`flex-1 overflow-y-auto ${isCompact ? 'p-6' : 'px-8 pb-8'} custom-scrollbar`}>
        <textarea
          id="content"
          placeholder="Write your story using Markdown..."
          aria-invalid={Boolean(errors.content)}
          {...register('content')}
          className="w-full h-full bg-transparent border-none outline-none resize-none text-lg leading-relaxed text-gray-700 placeholder:text-gray-300 min-h-[400px] font-mono"
        />
        {errors.content && (
          <p className="text-xs text-red-500 mt-2" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(EditorPanel);
