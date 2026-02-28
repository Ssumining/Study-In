import { useState, useEffect } from 'react';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  type Comment,
} from '@/api/comment';

const useComments = (studyPk: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 댓글 목록 조회
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getComments(studyPk);
      setComments(data);
    } catch (err) {
      setError('댓글을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 작성
  const handleCreate = async (content: string) => {
    if (!content.trim()) return;
    try {
      const newComment = await createComment(studyPk, { content });
      setComments((prev) => [...prev, newComment]);
    } catch (err) {
      setError('댓글 작성에 실패했습니다.');
      console.error(err);
    }
  };

  // 댓글 수정
  const handleUpdate = async (commentPk: number, content: string) => {
    if (!content.trim()) return;
    try {
      const updated = await updateComment(studyPk, commentPk, { content });
      setComments((prev) =>
        prev.map((c) => (c.id === commentPk ? updated : c))
      );
    } catch (err) {
      setError('댓글 수정에 실패했습니다.');
      console.error(err);
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentPk: number) => {
    try {
      await deleteComment(studyPk, commentPk);
      setComments((prev) => prev.filter((c) => c.id !== commentPk));
    } catch (err) {
      setError('댓글 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [studyPk]);

  return {
    comments,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};

export default useComments;