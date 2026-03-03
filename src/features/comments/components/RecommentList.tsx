import { useState } from 'react';
import type { Recomment } from '@/api/comment';
import { getFullUrl } from '@/api/upload';
import { useModalStore } from '@/store/modalStore';
import commentArrowIcon from '@/assets/base/icon-comment-arrow.svg';
interface RecommentListProps {
  recomments: Recomment[];
  commentPk: number;
  onCreateRecomment: (commentPk: number, content: string, isSecret: boolean, taggedUserId?: number) => void;
  onUpdateRecomment: (commentPk: number, recommentPk: number, content: string, isSecret: boolean) => void;
  onDeleteRecomment: (commentPk: number, recommentPk: number) => void;
  showInput: boolean;
  onCloseInput: () => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};



const RecommentList = ({
  recomments, commentPk,
  onCreateRecomment, onUpdateRecomment, onDeleteRecomment,
  showInput, onCloseInput,
}: RecommentListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const { openConfirm } = useModalStore();

  const handleUpdate = (recommentPk: number, isSecret: boolean) => {
    if (!editContent.trim()) return;
    onUpdateRecomment(commentPk, recommentPk, editContent, isSecret);
    setEditingId(null);
  };

  const handleSubmitReply = () => {
    if (!replyInput.trim()) return;
    onCreateRecomment(commentPk, replyInput, false);
    setReplyInput('');
    onCloseInput();
  };

  return (
    <div className="mt-2">
      {recomments.map((recomment) => {
        const isSecretOther = recomment.is_secret && !recomment.user?.is_author;
        const isDeleted = !recomment.user;

        return (
          <div key={recomment.recomment_id} className="flex gap-2 mt-2">
            {/* 꺾인 화살표 */}
            <img src={commentArrowIcon} alt="" className="flex-shrink-0 w-[22px] h-[26px]" />

            {/* 대댓글 내용 */}
            <div className="flex-1 min-w-0">
              <div className="flex gap-2">
                {/* 프로필 이미지 */}
                <img
                  src={getFullUrl(recomment.user?.profile_img ?? null) || '/default-profile.png'}
                  alt={recomment.user?.nickname ?? '익명'}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  {/* 닉네임 + 날짜 + 웹 버튼 */}
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-sm font-bold ${isDeleted ? 'text-gray-400' : 'text-gray-900'}`}>
                          {isSecretOther ? '익명' : (recomment.user?.nickname ?? '익명')}
                        </span>
                        {recomment.user?.is_author && (
                          <span className="text-xs text-primary border border-primary rounded px-1 py-0.5 leading-none flex-shrink-0">
                            내댓글
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(recomment.created)}</p>
                    </div>

                    {/* 웹 전용: 수정/삭제/신고 */}
                    {!isDeleted && (
                      <div className="hidden md:flex gap-2 flex-shrink-0">
                        {recomment.user?.is_author ? (
                          <>
                            <button
                              onClick={() => { setEditingId(recomment.recomment_id); setEditContent(recomment.content); }}
                              className="text-xs text-gray-500 underline"
                            >수정</button>
                            <button
                              onClick={() => openConfirm('delete', () => onDeleteRecomment(commentPk, recomment.recomment_id))}
                              className="text-xs text-gray-500 underline"
                            >삭제</button>
                          </>
                        ) : (
                          <button
                            onClick={() => openConfirm('report', () => console.log('신고'))}
                            className="text-xs text-gray-500 underline"
                          >신고</button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 내용 or 수정 입력창 */}
                  {editingId === recomment.recomment_id ? (
                    <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded px-2 py-1.5">
                      <input
                        type="text"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate(recomment.recomment_id, recomment.is_secret)}
                        className="flex-1 text-sm focus:outline-none min-w-0"
                      />
                      <button onClick={() => setEditingId(null)} className="text-xs text-gray-400 underline flex-shrink-0">취소</button>
                      <button onClick={() => handleUpdate(recomment.recomment_id, recomment.is_secret)} className="text-xs text-primary underline flex-shrink-0">저장</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 mt-1">
                      {recomment.is_secret && !isSecretOther && <span className="text-primary text-sm flex-shrink-0">🔒</span>}
                      {recomment.tagged_user && (
                        <span className="text-primary text-sm font-medium flex-shrink-0">@{recomment.tagged_user.nickname}</span>
                      )}
                      <p className={`text-sm break-all ${isSecretOther ? 'text-gray-400' : 'text-gray-700'}`}>
                        {isSecretOther ? '비밀 댓글입니다.' : recomment.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 답글 입력창 */}
      {showInput && (
        <div className="flex gap-2 mt-2">
          <img src={commentArrowIcon} alt="" className="flex-shrink-0 w-[22px] h-[26px]" />
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
            <input
              type="text"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitReply()}
              placeholder="답글을 입력하세요"
              className="flex-1 text-sm focus:outline-none"
              autoFocus
            />
            <button onClick={onCloseInput} className="text-xs text-gray-400 underline flex-shrink-0">취소</button>
            <button
              onClick={handleSubmitReply}
              disabled={!replyInput.trim()}
              className={`text-xs underline flex-shrink-0 ${replyInput.trim() ? 'text-primary' : 'text-gray-300'}`}
            >등록</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommentList;