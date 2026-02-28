import useComments from '../hooks/useComments';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  studyPk: number;
}

const CommentSection = ({ studyPk }: CommentSectionProps) => {
  const { comments, loading, error, handleCreate, handleUpdate, handleDelete } =
    useComments(studyPk);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">
        댓글 {comments.length > 0 && <span className="text-primary">{comments.length}</span>}
      </h2>

      {/* 에러 */}
      {error && (
        <p className="text-sm text-red-500 mb-2">{error}</p>
      )}

      {/* 댓글 목록 */}
      {loading ? (
        <p className="text-sm text-gray-400">댓글을 불러오는 중...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 py-4">아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* 댓글 입력창 */}
      <CommentInput onSubmit={handleCreate} />
    </div>
  );
};

export default CommentSection;