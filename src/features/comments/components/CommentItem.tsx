import { useState } from "react";
import type { Comment } from "@/api/comment";
import { getFullUrl } from "@/api/upload";
import { useModalStore } from "@/store/modalStore";
import IconLock from "@/assets/base/icon-Lock.svg?react";
import RecommentList from "./RecommentList";

interface CommentItemProps {
  comment: Comment;
  onUpdate: (commentPk: number, content: string, isSecret: boolean) => void;
  onDelete: (commentPk: number) => void;
  onCreateRecomment: (
    commentPk: number,
    content: string,
    isSecret: boolean,
  ) => void;
  onUpdateRecomment: (
    commentPk: number,
    recommentPk: number,
    content: string,
    isSecret: boolean,
  ) => void;
  onDeleteRecomment: (commentPk: number, recommentPk: number) => void;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const CommentItem = ({
  comment,
  onUpdate,
  onDelete,
  onCreateRecomment,
  onUpdateRecomment,
  onDeleteRecomment,
}: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [editIsSecret, setEditIsSecret] = useState(comment.is_secret ?? false);
  const [showRecommentInput, setShowRecommentInput] = useState(false);
  const { openConfirm } = useModalStore();

  const isDeleted = !!comment.is_delete;
  const isSecretOther = !!comment.is_secret && !comment.user?.is_author;

  const handleUpdate = () => {
    if (!editContent.trim()) return;
    onUpdate(comment.id, editContent, editIsSecret ?? false);
    setIsEditing(false);
  };

  return (
    <div className="py-4 border-b border-gray-300 last:border-0">
      <div className="flex gap-3">
        <img
          src={
            getFullUrl(comment.user?.profile.profile_img ?? null) ||
            "/default-profile.png"
          }
          alt={comment.user?.profile.nickname ?? "익명"}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-300"
        />

        <div className="flex-1 min-w-0">
          {/* 모바일 */}
          <div className="md:hidden">
            <div className="flex items-center gap-2">
              <span
                className={`text-base font-bold ${isDeleted ? "text-gray-500" : "text-surface"}`}
              >
                {isSecretOther
                  ? "익명"
                  : (comment.user?.profile.nickname ?? "익명")}
              </span>
              {comment.user?.is_author && (
                <span className="text-xs text-primary border border-primary rounded px-2 py-1 leading-none">
                  내댓글
                </span>
              )}
              {!isDeleted && (
                <button
                  onClick={() => setShowRecommentInput((prev) => !prev)}
                  className="text-base font-regular text-gray-500 underline"
                >
                  답글달기
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {comment.created ? formatDate(comment.created) : ""}
            </p>
          </div>

          {/* 웹 */}
          <div className="hidden md:flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-base font-bold ${isDeleted ? "text-gray-500" : "text-surface"}`}
              >
                {isSecretOther
                  ? "익명"
                  : (comment.user?.profile.nickname ?? "익명")}
              </span>
              {comment.user?.is_author && (
                <span className="text-xs text-primary border border-primary rounded px-2 py-1 leading-none">
                  내댓글
                </span>
              )}
              {!isDeleted && (
                <button
                  onClick={() => setShowRecommentInput((prev) => !prev)}
                  className="text-sm text-gray-500 underline"
                >
                  답글달기
                </button>
              )}
            </div>
            {!isDeleted && (
              <div className="flex items-center gap-3 flex-shrink-0">
                {comment.user?.is_author ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-gray-500 underline"
                    >
                      수정
                    </button>
                    <button
                      onClick={() =>
                        openConfirm("delete", () => onDelete(comment.id))
                      }
                      className="text-sm text-gray-500 underline"
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      openConfirm("report", () => console.log("신고"))
                    }
                    className="text-sm text-gray-500 underline"
                  >
                    신고
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 웹 날짜 */}
          <p className="hidden md:block text-sm text-gray-500 mt-1">
            {comment.created ? formatDate(comment.created) : ""}
          </p>

          {/* 내용 or 수정 입력창 */}
          {isEditing ? (
            <div className="mt-2 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                className="flex-1 text-base focus:outline-none"
              />
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm text-gray-500 underline"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdate}
                  className="text-sm text-primary underline"
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-1">
              {comment.is_secret && !isSecretOther && (
                <IconLock className="w-4 h-4 text-primary flex-shrink-0" />
              )}
              <p
                className={`text-base break-all ${isSecretOther ? "text-gray-500" : "text-gray-700"}`}
              >
                {isDeleted
                  ? "삭제된 댓글입니다."
                  : isSecretOther
                    ? "비밀 댓글입니다."
                    : comment.content}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 대댓글 */}
      {((comment.recomments && comment.recomments.length > 0) ||
        showRecommentInput) && (
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
