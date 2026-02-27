import React from 'react';

const CATEGORIES = [
  { id: 'lecture', label: '특강', icon: '🎓' },
  { id: 'concept', label: '개념학습', icon: '📖' },
  { id: 'apply', label: '응용/활용', icon: '💻' },
  { id: 'project', label: '프로젝트', icon: '🚀' },
  { id: 'challenge', label: '챌린지', icon: '🔥' },
  { id: 'cert', label: '자격증/시험', icon: '📝' },
  { id: 'job', label: '취업/코테', icon: '💼' },
  { id: 'etc', label: '기타', icon: '✨' },
];

const StudyFilter = () => {
  return (
    <div className="space-y-8 mb-10">
      {/* 3.1.5 검색창 마크업: 테마 변수 gray-100 활용 */}
      <div className="relative max-w-2xl mx-auto">
        <input 
          type="text"
          placeholder="어떤 스터디를 찾고 계신가요?"
          className="w-full py-4 px-6 rounded-2xl bg-gray-100 border-none focus:ring-2 focus:ring-primary-light outline-none text-base font-weight-medium placeholder:text-gray-500"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-700">
          🔍
        </button>
      </div>

      {/* 3.1.5 카테고리 필터: 8개 아이콘 그리드 배치 */}
      <div className="grid grid-cols-4 md:flex md:flex-wrap md:justify-center gap-y-6 gap-x-4">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id} 
            className="group flex flex-col items-center gap-2 w-full md:w-24"
          >
            {/* 호버 효과: 테마 변수 activation(연한 파랑) 활용 */}
            <div className="w-14 h-14 md:w-16 md:h-16 bg-background rounded-[20px] flex items-center justify-center shadow-sm border border-gray-100 transition-all duration-200 group-hover:bg-activation group-hover:border-primary-light group-hover:-translate-y-1">
              <span className="text-2xl">{cat.icon}</span>
            </div>
            <span className="text-sm font-weight-medium text-gray-700 group-hover:text-primary transition-colors">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudyFilter;