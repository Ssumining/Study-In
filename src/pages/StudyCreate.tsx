import { useCallback } from "react";
import StudyForm from "@/features/study/components/StudyForm";
import { useStudyForm } from "@/features/study/hooks/useStudyForm";
import type { StudyFormState } from "@/types/study";
import iconLogo from "@/assets/base/icon-Logo.svg";
import iconChatting from "@/assets/base/icon-chatting.svg";

export default function StudyCreate() {
  const handleSubmit = useCallback((formState: StudyFormState) => {
    // API 붙일 때 여기만 교체
    console.log("[StudyCreate] submit →", formState);
    alert("스터디가 생성되었습니다! (API 연동 전 임시 메시지)");
  }, []);

  const {
    form,
    errors,
    tagInput,
    setTagInput,
    isValid,
    fileInputRef,
    updateField,
    handleThumbnailChange,
    handleDayToggle,
    handleAddTag,
    handleAddTagDirect,
    handleRemoveTag,
    handleTagInputKeyDown,
    handleSubmit: onSubmit,
    handleReset,
  } = useStudyForm(handleSubmit);

  // TODO: 프로필 API 연결 시 로그인 사용자의 인증된 지역으로 교체
  const userLocation: string | undefined = undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── 앱 헤더 ── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          {/* 햄버거 */}
          <button type="button" className="p-1 -ml-1" aria-label="메뉴">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* 로고 */}
          <img src={iconLogo} alt="Studyin" className="h-6" />

          {/* 채팅 */}
          <button type="button" className="p-1 -mr-1" aria-label="채팅">
            <img src={iconChatting} alt="채팅" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ── 스터디 만들기 CTA 버튼 ── */}
      <div className="max-w-lg mx-auto px-4 pt-3 pb-1 flex justify-end">
        <button
          type="submit"
          form="study-create-form"
          disabled={!isValid}
          className={`min-w-[160px] min-h-[40px] py-[10px] px-6 rounded-xl text-sm font-bold text-white transition-colors ${
            isValid ? "bg-[#4F7BF7]" : "bg-[#c5d3fc]"
          }`}
        >
          스터디 만들기
        </button>
      </div>

      {/* ── 폼 ── */}
      <main className="max-w-lg mx-auto pb-10">
        <StudyForm
          form={form}
          errors={errors}
          tagInput={tagInput}
          isValid={isValid}
          fileInputRef={fileInputRef}
          setTagInput={setTagInput}
          updateField={updateField}
          handleThumbnailChange={handleThumbnailChange}
          handleDayToggle={handleDayToggle}
          handleAddTag={handleAddTag}
          handleAddTagDirect={handleAddTagDirect}
          handleRemoveTag={handleRemoveTag}
          handleTagInputKeyDown={handleTagInputKeyDown}
          handleSubmit={onSubmit}
          handleReset={handleReset}
          userLocation={userLocation}
        />
      </main>
    </div>
  );
}
