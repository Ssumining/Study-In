import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // 1. 상태 정의 (이게 누락되면 화면이 백지가 됩니다)
  const [activeTab, setActiveTab] = useState<"local" | "online">("local");
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* 왼쪽 영역: 로고와 탭 메뉴 */}
        <div className="flex items-center gap-10">
          <h1
            className="text-2xl font-black text-primary cursor-pointer"
            onClick={() => navigate("/")}
          >
            Studyin
          </h1>

          {/* 탭 메뉴 */}
          <nav className="relative flex items-center h-16 gap-6">
            <button
              onClick={() => setActiveTab("local")}
              className={`text-[18px] transition-colors ${
                activeTab === "local"
                  ? "font-bold text-black"
                  : "font-medium text-gray-400"
              }`}
            >
              내 지역
            </button>
            <button
              onClick={() => setActiveTab("online")}
              className={`text-[18px] transition-colors ${
                activeTab === "online"
                  ? "font-bold text-black"
                  : "font-medium text-gray-400"
              }`}
            >
              온라인
            </button>

            {/* 선택 표시 바 (Blue Bar) - Tailwind 클래스로 경고 해결 */}
            <div
              className={`absolute bottom-0 h-[3px] bg-primary transition-all duration-300 ease-in-out w-[50px] ${
                activeTab === "local" ? "translate-x-0" : "translate-x-[68px]"
              }`}
            />
          </nav>
        </div>

        {/* 오른쪽 영역 (임시 아이콘/검색창 자리) */}
        <div className="flex items-center gap-4 text-gray-500">
          <span>검색</span>
          <span>알림</span>
          <span>프로필</span>
        </div>
      </div>
    </header>
  );
}
