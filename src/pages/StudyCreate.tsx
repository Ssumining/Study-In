import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import StudyForm from "@/features/study/components/StudyForm";
import { useStudyForm } from "@/features/study/hooks/useStudyForm";
import MobileDrawer from "@/components/layout/MobileDrawer";
import type { StudyFormState } from "@/types/study";
import iconLogo from "@/assets/base/icon-Logo.svg";
import iconChatting from "@/assets/base/icon-chatting.svg";
import iconHamburger from "@/assets/base/icon-hamburger.svg";

export default function StudyCreate() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSubmit = useCallback((formState: StudyFormState) => {
    // TODO: API 붙일 때 여기만 교체
    console.log("[StudyCreate] submit payload →", formState);
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
    handleBlurField,
    handleSubmit: onSubmit,
    handleReset,
  } = useStudyForm(handleSubmit);

  // TODO: 프로필 API 연결 시 로그인 사용자의 인증된 지역으로 교체
  const userLocation: string | undefined = undefined;

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* ── 앱 헤더 ── */}
      <header className="bg-background border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          {/* 햄버거 */}
          <button
            type="button"
            className="p-1 -ml-1"
            aria-label="메뉴"
            onClick={() => setDrawerOpen(true)}
          >
            <img src={iconHamburger} alt="메뉴" className="w-6 h-6" />
          </button>

          {/* 로고 */}
          <Link to="/"><img src={iconLogo} alt="Studyin" className="h-6" /></Link>

          {/* 채팅 */}
          <button
            type="button"
            className="p-1 -mr-1"
            aria-label="채팅"
            onClick={() => console.log("[추후] 채팅")}
          >
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
          className={`min-w-[160px] min-h-[40px] py-[10px] px-6 rounded-xl text-sm font-bold text-background transition-colors ${
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
          handleBlurField={handleBlurField}
          handleSubmit={onSubmit}
          handleReset={handleReset}
          userLocation={userLocation}
        />
      </main>
    </div>

    <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
