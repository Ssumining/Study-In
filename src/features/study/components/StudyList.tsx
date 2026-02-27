import React from 'react';
import type { Study } from '../../../types/study';
import StudyCard from './StudyCard';

const MOCK_STUDIES: Study[] = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    title: '파이썬 기초부터 실전 프로젝트까지 함께해요',
    is_offline: true,
    location: '서울 강남',
    difficulty: '초급',
    topic: '개념학습',
    status: '모집 중',
    current_participants: 5,
    is_liked: true
  }
];

const StudyList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_STUDIES.map((study) => (
        <StudyCard key={study.id} study={study} />
      ))}
    </div>
  );
};

export default StudyList;