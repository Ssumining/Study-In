import type { ChangeEvent, KeyboardEvent, FormEvent, RefObject } from "react";
import type { StudyFormState, StudyFormErrors, StudyDay } from "@/types/study";

const DAYS: StudyDay[] = ["월", "화", "수", "목", "금", "토", "일"];
const STUDY_TYPES = [
  { value: "online", label: "온라인" },
  { value: "offline", label: "오프라인" },
  { value: "hybrid", label: "온·오프라인 병행" },
];
const SUBJECTS = ["프로그래밍", "어학", "취업/자격증", "독서", "기타"];
const DIFFICULTIES = [
  { value: "beginner", label: "초급" },
  { value: "intermediate", label: "중급" },
  { value: "advanced", label: "고급" },
];

interface StudyFormProps {
  form: StudyFormState;
  errors: StudyFormErrors;
  tagInput: string;
  isValid: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  setTagInput: (value: string) => void;
  updateField: <K extends keyof StudyFormState>(
    key: K,
    value: StudyFormState[K],
  ) => void;
  handleThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDayToggle: (day: StudyDay) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  handleTagInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  handleReset: () => void;
}

export default function StudyForm({
  form,
  errors,
  tagInput,
  isValid,
  fileInputRef,
  setTagInput,
  updateField,
  handleThumbnailChange,
  handleDayToggle,
  handleAddTag,
  handleRemoveTag,
  handleTagInputKeyDown,
  handleSubmit,
  handleReset,
}: StudyFormProps) {
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* 썸네일 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          썸네일 <span className="text-[#4F7BF7]">*</span>
        </label>
        <div
          className="relative w-full h-40 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-[#4F7BF7] transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {form.thumbnailPreview ? (
            <img
              src={form.thumbnailPreview}
              alt="썸네일 미리보기"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <svg
                className="w-8 h-8 text-gray-300 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-gray-400">클릭하여 이미지 업로드</p>
              <p className="text-xs text-gray-300 mt-1">JPG, PNG, GIF (최대 5MB)</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleThumbnailChange}
        />
        {errors.thumbnail && (
          <p className="mt-1.5 text-xs text-red-500">{errors.thumbnail}</p>
        )}
      </section>

      {/* 기본 정보 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-800">기본 정보</h2>

        {/* 제목 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            스터디 제목 <span className="text-[#4F7BF7]">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="스터디 제목을 입력해주세요"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        {/* 스터디 유형 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            스터디 유형 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex gap-2">
            {STUDY_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => updateField("studyType", value)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  form.studyType === value
                    ? "border-[#4F7BF7] bg-[#4F7BF7] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#4F7BF7]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {errors.studyType && (
            <p className="mt-1 text-xs text-red-500">{errors.studyType}</p>
          )}
        </div>

        {/* 지역 (오프라인일 때만) */}
        {(form.studyType === "offline" || form.studyType === "hybrid") && (
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              지역 <span className="text-[#4F7BF7]">*</span>
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="예) 서울 강남구"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-500">{errors.location}</p>
            )}
          </div>
        )}

        {/* 모집 인원 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            모집 인원 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={3}
              max={99}
              value={form.maxMembers}
              onChange={(e) => updateField("maxMembers", e.target.value)}
              placeholder="3 ~ 99"
              className="w-28 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
            />
            <span className="text-sm text-gray-500">명</span>
          </div>
          {errors.maxMembers && (
            <p className="mt-1 text-xs text-red-500">{errors.maxMembers}</p>
          )}
        </div>

        {/* 스터디 소개 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            스터디 소개
          </label>
          <textarea
            value={form.introduction}
            onChange={(e) => updateField("introduction", e.target.value)}
            placeholder="스터디를 간단히 소개해주세요"
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors resize-none"
          />
        </div>

        {/* 진행 방식 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            진행 방식
          </label>
          <textarea
            value={form.schedule}
            onChange={(e) => updateField("schedule", e.target.value)}
            placeholder="스터디 진행 방식을 입력해주세요"
            rows={2}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors resize-none"
          />
        </div>

        {/* 리더 소개 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            리더 소개
          </label>
          <textarea
            value={form.leaderIntro}
            onChange={(e) => updateField("leaderIntro", e.target.value)}
            placeholder="리더 소개를 입력해주세요"
            rows={2}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors resize-none"
          />
        </div>
      </section>

      {/* 일정 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-800">일정</h2>

        {/* 요일 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            요일
          </label>
          <div className="flex gap-1.5">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`w-9 h-9 rounded-full text-sm font-medium border transition-colors ${
                  form.days.includes(day)
                    ? "border-[#4F7BF7] bg-[#4F7BF7] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#4F7BF7]"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* 시작일 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            시작일 <span className="text-[#4F7BF7]">*</span>
          </label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
          />
          {errors.startDate && (
            <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
          )}
        </div>

        {/* 기간 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            기간 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={form.durationWeeks}
              onChange={(e) => updateField("durationWeeks", e.target.value)}
              placeholder="기간"
              className="w-24 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
            />
            <span className="text-sm text-gray-500">주</span>
          </div>
          {errors.durationWeeks && (
            <p className="mt-1 text-xs text-red-500">{errors.durationWeeks}</p>
          )}
        </div>

        {/* 시간 */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              시작 시간 <span className="text-[#4F7BF7]">*</span>
            </label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => updateField("startTime", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
            />
            {errors.startTime && (
              <p className="mt-1 text-xs text-red-500">{errors.startTime}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              종료 시간 <span className="text-[#4F7BF7]">*</span>
            </label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => updateField("endTime", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
            />
            {errors.endTime && (
              <p className="mt-1 text-xs text-red-500">{errors.endTime}</p>
            )}
          </div>
        </div>
      </section>

      {/* 주제 & 난이도 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-800">주제 & 난이도</h2>

        {/* 주제 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            주제 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => updateField("subject", s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  form.subject === s
                    ? "border-[#4F7BF7] bg-[#4F7BF7] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#4F7BF7]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* 난이도 */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            난이도 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex gap-2">
            {DIFFICULTIES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => updateField("difficulty", value)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  form.difficulty === value
                    ? "border-[#4F7BF7] bg-[#4F7BF7] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#4F7BF7]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {errors.difficulty && (
            <p className="mt-1 text-xs text-red-500">{errors.difficulty}</p>
          )}
        </div>
      </section>

      {/* 태그 */}
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          태그 <span className="text-[#4F7BF7]">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder="태그 입력 후 Enter 또는 추가"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2.5 rounded-xl bg-[#4F7BF7] text-white text-sm font-medium hover:bg-[#3d68e0] transition-colors"
          >
            추가
          </button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#4F7BF7] text-xs rounded-full"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-0.5 text-blue-300 hover:text-[#4F7BF7]"
                  aria-label={`${tag} 태그 삭제`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.tags && (
          <p className="mt-1.5 text-xs text-red-500">{errors.tags}</p>
        )}
      </section>

      {/* 버튼 */}
      <div className="flex gap-3 pb-8">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          초기화
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="flex-[2] py-3.5 rounded-2xl text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: isValid ? "#4F7BF7" : undefined }}
        >
          스터디 만들기
        </button>
      </div>
    </form>
  );
}
