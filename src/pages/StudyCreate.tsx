import { useCallback } from "react";
import StudyForm from "@/features/study/components/StudyForm";
import StudyCreateTopBar from "@/features/study/components/StudyCreateTopBar";
import { useStudyForm } from "@/features/study/hooks/useStudyForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { StudyFormState } from "@/types/study";

export default function StudyCreate() {
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
    <div className="min-h-screen bg-background">
      {/* ── 앱 헤더 (모바일/데스크탑 공통) ── */}
      <div className="sticky top-0 z-10">
        <Header />
      </div>

      {/* ── 스터디 만들기 TopBar ── */}
      <StudyCreateTopBar isValid={isValid} />

      {/* ── 폼 ── */}
      <main className="max-w-[1200px] mx-auto pb-10">
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

      <Footer />
    </div>
  );
}
