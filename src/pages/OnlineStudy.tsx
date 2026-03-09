import { useState } from "react";
import StudyListSection from "../features/study/components/StudyList";

export default function OnlineStudy() {
  const [activeTab, setActiveTab] = useState("최신 스터디");

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10 min-h-[800px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">온라인 스터디</h1>
      </div>

      <div className="space-y-6">
        {/* 탭 메뉴 */}
        <div className="flex gap-3">
          {["최신 스터디", "모집 중 스터디", "진행 중 스터디"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-full text-lg font-bold transition-all ${
                activeTab === tab 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 스터디 리스트 영역 */}
        <StudyListSection
          activeTab={activeTab}
          selectedCategory="전체"
          searchTerm=""
          large
        />

      </div>
    </div>
  );
}