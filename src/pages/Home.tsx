import React, { useState } from "react";
// 1. 컴포넌트들을 정확한 경로에서 불러옵니다.
import StudyBanner from "../features/study/components/StudyBanner";
import StudyFilter from "../features/study/components/StudyFilter";
import StudyProfileCard from "../features/study/components/StudyProfileCard";

// 2. 에러 해결을 위한 가짜 데이터(mockStudies) 정의
const mockStudies = [
  { id: 1, title: "크롬 확장 프로그램 함께 구현해 보실 분 찾습니다.", status: "진행 중" as const, dDay: "D+8", image: "https://via.placeholder.com/150" },
  { id: 2, title: "8주 파이썬 정복하기", status: "진행 중" as const, dDay: "D+8", image: "https://via.placeholder.com/150" },
  { id: 3, title: "매일 IT 아티클 읽고 요약해서 공유하실 분?", status: "모집 중" as const, dDay: "D-10", image: "https://via.placeholder.com/150" },
  { id: 4, title: "매일 IT 아티클 읽고 요약해서 공유하실 분?", status: "모집 중" as const, dDay: "D-13", image: "https://via.placeholder.com/150" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 로그인 상태 테스트를 위해 직접 변경해 보세요 (true: 로그인됨, false: 로그인 전)
  const isLoggedIn = true; 

  return (
    <main className="min-h-screen bg-white">
      {/* 배너와 프로필 카드가 나란히 배치되는 영역 */}
      <div className="max-w-[1200px] mx-auto pt-10 px-4 flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          <StudyBanner />
        </div>
        
        {/* 우측 프로필/스터디 관리 카드 (조건 1, 2, 3 반영) */}
        <aside className="w-[300px] shrink-0">
          <StudyProfileCard 
            isLoggedIn={isLoggedIn} 
            studies={mockStudies} // 스터디가 없는 경우를 보려면 [] 로 변경
            userName="파이썬 연금술사"
          />
        </aside>
      </div>

      {/* 카테고리 필터 영역 */}
      <div className="max-w-[1200px] mx-auto py-10 px-4">
        <StudyFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        {/* 여기에 스터디 리스트 컴포넌트가 들어갈 예정입니다. */}
      </div>
    </main>
  );
}