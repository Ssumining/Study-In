import { useState } from 'react';
import type { Comment } from '@/api/comment';
import { getFullUrl } from '@/api/upload';
import { useModalStore } from '@/store/modalStore';
import RecommentList from './RecommentList';

interface CommentItemProps {
  comment: Comment;
  onUpdate: (commentPk: number, content: string, isSecret: boolean) => void;
  onDelete: (commentPk: number) => void;
  onCreateRecomment: (commentPk: number, content: string, isSecret: boolean) => void;
  onUpdateRecomment: (commentPk: number, recommentPk: number, content: string, isSecret: boolean) => void;
  onDeleteRecomment: (commentPk: number, recommentPk: number) => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

const CommentItem = ({
  comment, onUpdate, onDelete,
  onCreateRecomment, onUpdateRecomment, onDeleteRecomment,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [editIsSecret, setEditIsSecret] = useState(comment.is_secret ?? false);
  const [showRecommentInput, setShowRecommentInput] = useState(false);
  const { openModal, openConfirm } = useModalStore();

  const isDeleted = !!comment.is_delete;
  const isSecretOther = !!comment.is_secret && !comment.user?.is_author;

  const handleUpdate = () => {
    if (!editContent.trim()) return;
    onUpdate(comment.id, editContent, editIsSecret ?? false);
    setIsEditing(false);
  };

console.log("comment:", comment);
console.log("is_author:", comment.user?.is_author);
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex gap-3">
        {/* 프로필 이미지 */}
        <img
          src={getFullUrl(comment.user?.profile_img ?? null) || '/default-profile.png'}
          alt={comment.user?.nickname ?? '익명'}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">

          {/* 모바일: 닉네임 + 답글달기 / 날짜 */}
          <div className="md:hidden">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${isDeleted ? 'text-gray-400' : 'text-gray-900'}`}>
                {isSecretOther ? '익명' : (comment.user?.nickname ?? '미지의 사용자')}
              </span>
              {comment.user?.is_author && (
                <span className="text-xs text-primary border border-primary rounded px-1.5 py-0.5 leading-none">
                  내댓글
                </span>
              )}
              {!isDeleted && (
                <button
                  onClick={() => setShowRecommentInput((prev) => !prev)}
                  className="text-xs text-gray-400 underline"
                >
                  답글달기
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {comment.created ? formatDate(comment.created) : ''}
            </p>
          </div>

          {/* 웹: 닉네임 + 내댓글뱃지 + 답글달기 + 수정/삭제/신고 한 줄 */}
          <div className="hidden md:flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-bold ${isDeleted ? 'text-gray-400' : 'text-gray-900'}`}>
                {isSecretOther ? '익명' : (comment.user?.nickname ?? '미지의 사용자')}
              </span>
              {comment.user?.is_author && (
                <span className="text-xs text-primary border border-primary rounded px-1.5 py-0.5 leading-none">
                  내댓글
                </span>
              )}
              {!isDeleted && (
                <button
                  onClick={() => setShowRecommentInput((prev) => !prev)}
                  className="text-xs text-gray-400 underline"
                >
                  답글달기
                </button>
              )}
            </div>
            {!isDeleted && (
              <div className="flex items-center gap-3 flex-shrink-0">
                {comment.user?.is_author ? (
                  <>
                    <button onClick={() => setIsEditing(true)} className="text-sm text-gray-500 underline">수정</button>
                    <button onClick={() => openConfirm('delete', () => onDelete(comment.id))} className="text-sm text-gray-500 underline">삭제</button>
                  </>
                ) : (
                  <button onClick={() => openConfirm('report', () => console.log('신고'))} className="text-sm text-gray-500 underline">신고</button>
                )}
              </div>
            )}
          </div>

          {/* 웹 날짜 */}
          <p className="hidden md:block text-xs text-gray-400 mt-0.5">
            {comment.created ? formatDate(comment.created) : ''}
          </p>

          {/* 내용 or 수정 입력창 */}
          {isEditing ? (
            <div className="mt-2 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                className="flex-1 text-sm focus:outline-none"
              />
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setIsEditing(false)} className="text-xs text-gray-400 underline">취소</button>
                <button onClick={handleUpdate} className="text-xs text-primary underline">저장</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-1">
              {comment.is_secret && !isSecretOther && <span className="text-primary text-sm">🔒</span>}
              <p className={`text-sm break-all ${isSecretOther ? 'text-gray-400' : 'text-gray-700'}`}>
                {isDeleted ? '삭제된 댓글입니다.' : isSecretOther ? '비밀 댓글입니다.' : comment.content}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 대댓글 */}
      {((comment.recomments && comment.recomments.length > 0) || showRecommentInput) && (
        <RecommentList
          recomments={comment.recomments ?? []}
          commentPk={comment.id}
          onCreateRecomment={onCreateRecomment}
          onUpdateRecomment={onUpdateRecomment}
          onDeleteRecomment={onDeleteRecomment}
          showInput={showRecommentInput}
          onCloseInput={() => setShowRecommentInput(false)}
        />
      )}
    </div>
    
  );
};

export default CommentItem;