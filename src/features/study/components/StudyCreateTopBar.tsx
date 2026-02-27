import iconDots from "@/assets/base/icon-dots.svg";

interface StudyCreateTopBarProps {
  isValid: boolean;
  onViewStudy?: () => void; // 스터디 생성 완료 후 표시
}

export default function StudyCreateTopBar({ isValid, onViewStudy }: StudyCreateTopBarProps) {
  return (
    <div className="w-full bg-white border-b border-[#D9DBE0]">
      <div className="max-w-[1200px] mx-auto h-[56px] lg:h-[60px] px-4 flex items-center justify-end gap-[8px]">
        {onViewStudy && (
          <button
            type="button"
            onClick={onViewStudy}
            className="w-[110px] lg:w-[160px] h-[40px] border border-[#D9DBE0] rounded-lg text-sm font-medium text-[#121314] bg-white transition-colors hover:bg-gray-50"
          >
            스터디 보기
          </button>
        )}
        <button
          type="submit"
          form="study-create-form"
          disabled={!isValid}
          className={`w-[160px] h-[40px] rounded-lg text-sm font-medium text-white transition-colors ${
            isValid ? "bg-[#2E6FF2]" : "bg-[#c5d3fc]"
          }`}
        >
          스터디 만들기
        </button>
        {onViewStudy && (
          <button type="button" className="w-[30px] h-[30px] flex items-center justify-center">
            <img src={iconDots} alt="더보기" className="w-[30px] h-[30px]" />
          </button>
        )}
      </div>
    </div>
  );
}
