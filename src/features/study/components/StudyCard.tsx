import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. 이동 함수를 가져옵니다.
import type { Study } from '../../../types/study';

interface StudyCardProps {
  study: Study;
}

const StudyCard = ({ study }: StudyCardProps) => {
  const navigate = useNavigate(); // 👈 2. 이동 기능을 사용할 준비를 합니다.

  return (
    <div 
      // 3. 클릭하면 상세 주소(/study/아이디)로 이동하게 설정합니다.
      onClick={() => navigate(`/study/${study.id}`)} 
      // 4. 마우스를 올렸을 때 손가락 모양(cursor-pointer)이 나오도록 추가했습니다.
      className="bg-background rounded-[20px] border border-gray-100 overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-16/10">
        <img 
          src={study.thumbnail} 
          alt={study.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-background text-xs font-bold px-2 py-1 rounded-lg">
            {study.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-base font-bold text-gray-900 mb-2">{study.title}</h4>
        <div className="text-sm text-gray-500">참여 {study.current_participants}명</div>
      </div>
    </div>
  );
};

export default StudyCard;