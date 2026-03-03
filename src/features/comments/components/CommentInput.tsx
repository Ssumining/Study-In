import { useState } from 'react';

interface CommentInputProps {
  onSubmit: (content: string, isSecret: boolean) => void;
  placeholder?: string;
  isRecomment?: boolean;
}

const CommentInput = ({
  onSubmit,
  placeholder = '다른 사람의 권리를 침해하거나 명예를 훼손하는 댓글은 관련 법률에 의해 제재를 받을 수 있습니다.',
  isRecomment = false,
}: CommentInputProps) => {
  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  // 모바일은 1000자, 웹은 300자
  const MAX_LENGTH = 1000;

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content, isSecret);
    setContent('');
    setIsSecret(false);
  };

  return (
    <div className="flex flex-col">
      {/* textarea */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= MAX_LENGTH) setContent(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full px-4 pt-4 pb-2 text-sm text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none
            min-h-[80px] md:min-h-[80px]
            /* 모바일에서 더 크게 */
            max-md:min-h-[200px]"
        />
        {/* 웹: 글자수 + 비밀댓글 + 등록 버튼을 textarea 하단에 */}
        <div className="hidden md:flex items-center justify-between border-t border-gray-200 px-4 py-2">
          <div className="flex items-center gap-2">
            {!isRecomment && (
              <>
                <input
                  type="checkbox"
                  id="is_secret_web"
                  checked={isSecret}
                  onChange={(e) => setIsSecret(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <label htmlFor="is_secret_web" className="text-sm text-gray-500 cursor-pointer">비밀댓글</label>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{content.length}/{MAX_LENGTH}</span>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className={`px-5 py-1.5 rounded text-sm font-medium transition ${
                content.trim() ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              등록
            </button>
          </div>
        </div>
      </div>

      {/* 글자수 - 모바일 전용 (textarea 바깥 우측 하단) */}
      <div className="md:hidden text-right text-xs text-gray-400 mt-1 pr-1">
        {content.length}/{MAX_LENGTH}
      </div>

      {/* 모바일: 비밀댓글 + 등록 고정 하단 바 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 flex items-center border-t border-gray-200 bg-white z-10">
        {!isRecomment && (
          <label className="flex items-center gap-2 flex-1 px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isSecret}
              onChange={(e) => setIsSecret(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className={`text-sm font-medium ${isSecret ? 'text-primary' : 'text-gray-400'}`}>비밀댓글</span>
          </label>
        )}
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className={`px-8 py-3 text-sm font-medium border-l border-gray-200 ${
            content.trim() ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default CommentInput;