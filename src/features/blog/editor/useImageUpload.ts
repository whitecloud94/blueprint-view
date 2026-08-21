import { useCallback, useRef, useState, type DragEvent, type RefObject, type ClipboardEvent } from 'react';
import { imageService } from '../../../services/imageService';
import { getAxiosErrorMessage } from '../../../api/axiosInstance';

interface UseImageUploadOptions {
  /** 커서 위치를 읽고 삽입 후 되돌리기 위해 필요하다. */
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  getContent: () => string;
  setContent: (value: string) => void;
  onError?: (message: string) => void;
}

/**
 * 에디터 본문에 이미지를 붙여넣기/드래그앤드롭으로 삽입한다.
 *
 * <p>업로드가 끝날 때까지 기다렸다가 넣지 않고, 먼저 자리표시자를 삽입한 뒤
 * 완료 시점에 실제 마크다운으로 치환한다. 업로드 도중에도 글을 계속 쓸 수 있고,
 * 어디에 이미지가 들어갈지 눈으로 확인할 수 있기 때문이다.
 *
 * <p>자리표시자에 임의 토큰을 붙이는 이유는, 업로드를 기다리는 사이 사용자가
 * 본문을 고쳐 위치가 밀리더라도 정확히 그 자리만 찾아 바꾸기 위해서다.
 */
export function useImageUpload({ textareaRef, getContent, setContent, onError }: UseImageUploadOptions) {
  const [uploadingCount, setUploadingCount] = useState(0);
  const [isDraggingOver, setDraggingOver] = useState(false);

  // 같은 렌더 안에서 여러 장을 처리할 때 토큰이 겹치지 않도록 증가시킨다.
  const tokenSequence = useRef(0);

  const insertAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current;
      const content = getContent();

      // 포커스가 없으면 커서 위치를 알 수 없다. 이때는 본문 끝에 붙인다.
      const position = textarea?.selectionStart ?? content.length;
      const next = content.slice(0, position) + text + content.slice(position);

      setContent(next);

      // 리렌더 후에 캐럿을 삽입한 텍스트 뒤로 옮긴다.
      requestAnimationFrame(() => {
        if (!textarea) return;
        const caret = position + text.length;
        textarea.setSelectionRange(caret, caret);
        textarea.focus();
      });
    },
    [getContent, setContent, textareaRef],
  );

  /** 자리표시자를 결과로 치환한다. 그 사이 사용자가 입력했을 수 있어 최신 본문을 다시 읽는다. */
  const replacePlaceholder = useCallback(
    (placeholder: string, replacement: string) => {
      setContent(getContent().replace(placeholder, replacement));
    },
    [getContent, setContent],
  );

  const uploadFiles = useCallback(
    async (files: File[]) => {
      for (const file of files) {
        tokenSequence.current += 1;
        const placeholder = `![업로드 중 #${tokenSequence.current}]()`;

        insertAtCursor(placeholder);
        setUploadingCount((count) => count + 1);

        try {
          const { url } = await imageService.upload(file);
          replacePlaceholder(placeholder, `![${buildAltText(file)}](${url})`);
        } catch (error) {
          // 실패한 자리표시자를 남기면 본문에 깨진 마크다운이 그대로 저장된다.
          replacePlaceholder(placeholder, '');
          onError?.(getAxiosErrorMessage(error, '이미지 업로드에 실패했습니다.'));
        } finally {
          setUploadingCount((count) => count - 1);
        }
      }
    },
    [insertAtCursor, onError, replacePlaceholder],
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLTextAreaElement>) => {
      const images = extractImageFiles(event.clipboardData.files);
      // 이미지가 없으면 텍스트 붙여넣기이므로 기본 동작을 그대로 둔다.
      if (images.length === 0) return;

      event.preventDefault();
      void uploadFiles(images);
    },
    [uploadFiles],
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLTextAreaElement>) => {
      setDraggingOver(false);

      const images = extractImageFiles(event.dataTransfer.files);
      if (images.length === 0) return;

      event.preventDefault();
      void uploadFiles(images);
    },
    [uploadFiles],
  );

  const handleDragOver = useCallback((event: DragEvent<HTMLTextAreaElement>) => {
    if (!containsFiles(event.dataTransfer)) return;

    // preventDefault 를 하지 않으면 브라우저가 파일을 새 탭으로 열어 버린다.
    event.preventDefault();
    setDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setDraggingOver(false), []);

  return {
    isUploading: uploadingCount > 0,
    isDraggingOver,
    handlePaste,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
}

function extractImageFiles(fileList: FileList | null): File[] {
  if (!fileList) return [];
  return Array.from(fileList).filter((file) => file.type.startsWith('image/'));
}

function containsFiles(dataTransfer: DataTransfer): boolean {
  return Array.from(dataTransfer.types).includes('Files');
}

/**
 * 대체 텍스트.
 *
 * <p>스크린샷 붙여넣기는 파일명이 'image.png' 처럼 무의미하거나 비어 있다.
 * 확장자를 떼어 그대로 쓰되, 값이 없으면 최소한의 설명을 남긴다.
 */
function buildAltText(file: File): string {
  const name = file.name?.replace(/\.[^.]+$/, '').trim();
  return name ? name : '첨부 이미지';
}
