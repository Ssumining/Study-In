import { useState, useEffect } from "react";
import { useStudyList } from "../hooks/useStudyList";
import StudyCard from "./StudyCard";
import { useNavigate } from "react-router-dom";
import leftIcon from "@/assets/base/icon-left.svg";

interface StudyListProps {
  selectedCategory: string;
  searchTerm: string;
  activeTab: string;
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  // 최대 5개 페이지 번호 표시
  const getPageNumbers = () => {
    const delta = 2;
    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);
    const pages: (number | "...")[] = [];

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-30 hover:bg-gray-100"
        aria-label="이전 페이지"
      >
        <img src={leftIcon} alt="이전" className="w-4 h-4" />
      </button>

      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span
            key={`dot-${i}`}
            className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
              page === p
                ? "bg-primary text-background"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-30 hover:bg-gray-100 rotate-180"
        aria-label="다음 페이지"
      >
        <img src={leftIcon} alt="다음" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function StudyList({
  selectedCategory,
  searchTerm,
  activeTab,
}: StudyListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // 탭/검색어 바뀌면 1페이지로 리셋
  useEffect(() => {
    setPage(1);
  }, [activeTab, searchTerm, selectedCategory]);
  const { studies, isLoading, error, totalPages } = useStudyList(
    selectedCategory,
    searchTerm,
    activeTab,
    page,
  );

  const handleTabChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500 font-medium">
        스터디를 불러오는 중입니다...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-center text-error font-medium">{error}</div>
    );

  if (studies.length === 0)
    return (
      <div className="flex flex-col items-center py-16 gap-5">
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[18px] font-bold text-surface text-center">
            아직 열린 스터디가 없어요.
          </p>
          <p className="text-[16px] text-[#47494D] text-center">
            첫 스터디를 직접 만들어 보세요!
          </p>
        </div>
        <button
          onClick={() => navigate("/study/create")}
          className="w-[250px] h-[50px] bg-primary text-white text-[16px] font-medium rounded-[8px]"
        >
          스터디 만들기
        </button>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-6 md:px-4">
        {studies.map((study) => (
          <StudyCard key={study.id} study={study} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handleTabChange}
      />
    </>
  );
}
