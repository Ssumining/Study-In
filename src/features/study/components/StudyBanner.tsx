import React, { useState, useEffect } from "react";
import banner1 from "../../../assets/main-banner-1.png";
import banner2 from "../../../assets/main-banner-2.png";
import banner3 from "../../../assets/main-banner-3.png";
// 화살표 아이콘을 위해 lucide-react 라이브러리를 사용합니다 (프로젝트에 설치되어 있을 거예요)
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StudyBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [banner1, banner2, banner3];

  // 다음 슬라이드로 이동하는 함수
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  // 이전 슬라이드로 이동하는 함수
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // 자동 전환 로직
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // 5초로 조금 여유 있게 조절했습니다
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="group relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl bg-gray-100 mb-10">
      {/* 이미지 슬라이드 영역 */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((img, index) => (
          <div key={index} className="min-w-full h-full">
            <img src={img} alt={`배너 ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 좌우 화살표 버튼 (마우스를 올리면 나타납니다) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="다음 슬라이드"
      >
        <ChevronRight size={32} />
      </button>

      {/* 페이지네이션 (점 3개만 정확히 표시) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-primary w-8' : 'bg-white/60 w-3'
            }`}
            aria-label={`${index + 1}번 슬라이드로 이동`}
          />
        ))}
      </div>
    </div>
  );
}