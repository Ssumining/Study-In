export type StudyDay = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export interface StudyFormState {
  thumbnail: File | null;
  thumbnailPreview: string;
  title: string;
  studyType: string;
  location: string;
  maxMembers: string;
  introduction: string;
  schedule: string;
  leaderIntro: string;
  days: StudyDay[];
  startDate: string;
  durationWeeks: string;
  startTime: string;
  endTime: string;
  subject: string;
  difficulty: string;
  tags: string[];
}

export interface StudyFormErrors {
  thumbnail?: string;
  title?: string;
  studyType?: string;
  location?: string;
  maxMembers?: string;
  introduction?: string;
  schedule?: string;
  leaderIntro?: string;
  days?: string;
  startDate?: string;
  durationWeeks?: string;
  startTime?: string;
  endTime?: string;
  timeRange?: string;
  subject?: string;
  difficulty?: string;
  tags?: string;
}
