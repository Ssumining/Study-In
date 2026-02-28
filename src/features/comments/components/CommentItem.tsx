import { useState } from 'react';
import type { Comment } from '../../../api/comment';
import { getFullUrl } from '../../../api/upload';

interface CommentItemProps {
  comment: Comment;
  onUpdate: (commentPk: number, content: string) => void;
  onDelete: (commentPk: number) => void;
}

// 날짜 포맷 함수
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CommentItem = ({ comment, onUpdate, onDelete }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showMenu, setShowMenu] = useState(false);

  const handleUpdate = () => {
    if (!editContent.trim()) return;
    onUpdate(comment.id, editContent);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      {/* 프로필 이미지 */}
      <img
        src={getFullUrl(comment.user.profile_img) || '/default-profile.png'}
        alt={comment.user.nickname}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1">
        {/* 닉네임 + 시간 + 더보기 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {comment.user.nickname}
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(comment.created)}
            </span>
          </div>

          {/* 더보기 버튼 */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="text-gray-400 hover:text-gray-600 px-1"
            >
              ⋯
            </button>

            {/* 드롭다운 메뉴 */}
            {showMenu && (
              <div className="absolute right-0 top-6 z-10 bg-white border border-gray-200 rounded-lg shadow-md min-w-[100px]">
                {comment.user.is_author ? (
                  // 내 댓글: 수정 / 삭제
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        onDelete(comment.id);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  // 타인 댓글: 신고
                  <button
                    onClick={() => {
                      // TODO: 신고 모달 연결
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    신고
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 댓글 내용 또는 수정 입력창 */}
        {isEditing ? (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleUpdate}
              className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
              }}
              className="px-3 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-sm"
            >
              취소
            </button>
          </div>
        ) : (
          <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;