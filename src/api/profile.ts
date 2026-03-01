import { axiosInstance } from './axios';

export interface PreferredRegion {
  id: number;
  sort_order: number;
  location: string;
}

export interface UserProfile {
  is_associate_member: boolean;
  is_social_user: boolean;
  user_login_type: string;
  user: number;
  name?: string;
  nickname: string;
  profile_img: string;
  introduction: string;
  phone?: string;
  preferred_region: PreferredRegion | null;
  github_username: string;
  tag: Array<{ id: number; name: string }>;
  grade: string;
}

export async function getProfile(userId: number): Promise<UserProfile> {
  const res = await axiosInstance.get<UserProfile>(`/accounts/profiles/${userId}/`);
  return res.data;
}
