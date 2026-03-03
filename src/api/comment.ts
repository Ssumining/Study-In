import { axiosInstance } from "./axios";

export interface Comment {
  id: number;
  is_secret?: boolean;
  is_delete?: boolean;
  user?: {
    user_id: number;
    nickname: string;
    profile_img: string | null;
    is_author: boolean;
  };
  study: number;
  content: string;
  created?: string;
  updated?: string;
  recomments?: Recomment[];
}

export interface Recomment {
  recomment_id: number;
  is_secret: boolean;
  study_id: number;
  comment_id: number;
  user?: {
    user_id: number;
    nickname: string;
    profile_img: string | null;
    is_author: boolean;
  };
  content: string;
  tagged_user?: { user_id: number; nickname: string } | null;
  created: string;
  updated: string;
}

export interface CreateCommentRequest {
  content: string;
  is_secret?: boolean;
}

export interface CreateRecommentRequest {
  content: string;
  is_secret?: boolean;
  tagged_user?: number;
}

export const getComments = async (studyPk: number): Promise<Comment[]> => {
  const response = await axiosInstance.get(`/study/${studyPk}/comment/`);
  return response.data;
};

export const createComment = async (
  studyPk: number,
  data: CreateCommentRequest,
): Promise<Comment> => {
  const response = await axiosInstance.post(`/study/${studyPk}/comment/`, data);
  return response.data;
};

export const updateComment = async (
  studyPk: number,
  commentPk: number,
  data: CreateCommentRequest,
): Promise<Comment> => {
  const response = await axiosInstance.put(
    `/study/${studyPk}/comment/${commentPk}/`,
    data,
  );
  return response.data;
};

export const deleteComment = async (
  studyPk: number,
  commentPk: number,
): Promise<void> => {
  await axiosInstance.delete(`/study/${studyPk}/comment/${commentPk}/`);
};

export const createRecomment = async (
  studyPk: number,
  commentPk: number,
  data: CreateRecommentRequest,
): Promise<Recomment> => {
  const payload: any = {
    content: data.content,
    is_secret: data.is_secret ?? false,
  };

  // tagged_user가 있을 때만 추가
  if (data.tagged_user !== undefined && data.tagged_user !== null) {
    payload.tagged_user = data.tagged_user;
  }

  const response = await axiosInstance.post(
    `/study/${studyPk}/comment/${commentPk}/recomment/`,
    payload,
  );

  return response.data;
};

export const updateRecomment = async (
  studyPk: number,
  commentPk: number,
  recommentPk: number,
  data: CreateCommentRequest,
): Promise<Recomment> => {
  const response = await axiosInstance.put(
    `/study/${studyPk}/comment/${commentPk}/recomment/${recommentPk}/`,
    data,
  );
  return response.data;
};

export const deleteRecomment = async (
  studyPk: number,
  commentPk: number,
  recommentPk: number,
): Promise<void> => {
  await axiosInstance.delete(
    `/study/${studyPk}/comment/${commentPk}/recomment/${recommentPk}/`,
  );
};
