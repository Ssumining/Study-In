import React, { useState, useEffect } from "react";

const banners = [
  "public/main-banner-1.png",
  "public/main-banner-2.png",
  "public/main-banner-3.png"
];


export default function StudyBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // 3초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    /* md:h-[300px]를 md:h-[auto]와 aspect 비율로 변경하여 이미지가 잘리지 않게 합니다 */
    <div className="group relative w-full overflow-hidden rounded-[12px] shadow-sm bg-[#f8f9fa] aspect-[16/9] md:aspect-[3/1]">
      
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        /* eslint-disable-next-line */
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((img, index) => (
          <div key={index} className="min-w-full h-full flex items-center justify-center bg-[#f8f9fa]">
            <img
              src={img}
              alt={`배너 ${index + 1}`}
              /* object-contain: 이미지가 잘리지 않고 영역 안에 다 들어오게 함
                 w-full h-full: 영역을 꽉 채움 
              */
              className="w-full h-full object-contain" 
            />
          </div>
        ))}
      </div>

      {/* 좌측 화살표 (웹에서만 보이고 모바일은 숨김 처리 가능: hidden md:block) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white transition-opacity duration-300 group-hover:opacity-100 opacity-0 z-10 hidden md:block"
      >
        <span className="text-2xl">{"<"}</span>
      </button>

      {/* 우측 화살표 */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white transition-opacity duration-300 group-hover:opacity-100 opacity-0 z-10 hidden md:block"
      >
        <span className="text-2xl">{">"}</span>
      </button>

      {/* 하단 페이지네이션 점 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}