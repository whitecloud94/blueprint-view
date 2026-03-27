import React from 'react';
import {Send} from 'lucide-react';
import {useBlogStore} from '../../../store/useBlogStore';
import {postService} from "../../../services/postService.ts";
import {postSchema} from "../../../schemas/postSchema.ts";

interface EditorPaneProps {
  className?: string;
  isCompact?: boolean;
}

const EditorPanel = ({
  className = '',
  isCompact = false,
}: EditorPaneProps) => {
  const { formData, setFormData, reset } = useBlogStore();
  const { titleName, content } = formData;

  const handlePublish = async () => {
    const postData = { ...formData, writer: 'admin', excerpt: formData.content.substring(0, 100), boardStatusCode: '01' }; // 나중엔 실제 로그인 유저 정보 연동
    const validationResult = postSchema.safeParse(postData);
    if (!validationResult.success) {
      alert(validationResult.error.message)
      return;
    }

    try {
      await postService.addPost(validationResult.data);
      alert('포스트가 성공적으로 등록되었습니다.');
      reset();
    } catch (error) {
      console.error('Failed to add post:', error);
      alert('포스트 등록에 실패했습니다.');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ titleName: e.target.value});
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ content: e.target.value });
  };

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      <div className={`${isCompact ? 'p-6' : 'p-8'} space-y-6 shrink-0 border-b border-gray-100`}>
        <input
          type="text"
          placeholder="Enter post title..."
          value={titleName}
          onChange={handleTitleChange}
          className={`w-full ${
            isCompact ? 'text-2xl' : 'text-4xl'
          } font-black bg-transparent border-none outline-none placeholder:text-gray-300 text-gray-900`}
        />

        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center flex-1">
            {/* 태그 및 프로젝트 연동 기능은 추후 테이블 설계 완료 후 추가 예정 */}
          </div>

          <button
            onClick={handlePublish}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-200"
          >
            <Send size={18} />
            Publish
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto ${isCompact ? 'p-6' : 'px-8 pb-8'} custom-scrollbar`}>
        <textarea
          placeholder="Write your story using Markdown..."
          value={content}
          onChange={handleContentChange}
          className="w-full h-full bg-transparent border-none outline-none resize-none text-lg leading-relaxed text-gray-700 placeholder:text-gray-300 min-h-[400px] font-mono"
        />
      </div>
    </div>
  );
};

export default React.memo(EditorPanel);
