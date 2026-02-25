import type { ChangeEvent, KeyboardEvent, FormEvent, RefObject } from "react";
import type { StudyFormState, StudyFormErrors, StudyDay } from "@/types/study";

const DAYS: StudyDay[] = ["월", "화", "수", "목", "금", "토", "일"];

const STUDY_TYPES = [
  { value: "offline", label: "내 지역" },
  { value: "online", label: "온라인" },
];

const DURATIONS = [
  "1주", "2주", "4주", "6주", "8주", "10주", "12주", "16주",
];

const SUBJECTS = [
  "개념/학습", "응용/활용", "프로젝트", "챌린지",
  "자격증/시험", "취업/코테", "특강", "기타",
];

const DIFFICULTIES = [
  { value: "beginner", label: "초급" },
  { value: "intermediate", label: "중급" },
  { value: "advanced", label: "고급" },
];

const MAX_TITLE = 80;
const MAX_INTRO = 1000;
const MAX_SCHEDULE = 500;
const MAX_TAGS = 5;

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
  fileInputRef,
  setTagInput,
  updateField,
  handleThumbnailChange,
  handleDayToggle,
  handleAddTag,
  handleRemoveTag,
  handleTagInputKeyDown,
  handleSubmit,
}: StudyFormProps) {
  return (
    <form id="study-create-form" onSubmit={handleSubmit} noValidate>

      {/* ── 대표 이미지 ── */}
      <div
        className="relative w-full bg-gray-100 cursor-pointer overflow-hidden"
        style={{ aspectRatio: "4/3" }}
        onClick={() => fileInputRef.current?.click()}
      >
        {form.thumbnailPreview ? (
          <img
            src={form.thumbnailPreview}
            alt="대표 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <p className="text-sm font-medium text-gray-400">대표 이미지 삽입</p>
            <p className="text-xs text-gray-400">(권장 사이즈 1200*1200px)</p>
          </div>
        )}
        {/* 카메라 아이콘 */}
        {!form.thumbnailPreview && (
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
      </div>
      {errors.thumbnail && (
        <p className="px-4 pt-1.5 text-xs text-red-500">{errors.thumbnail}</p>
      )}

      {/* ── 기본 정보 ── */}
      <div className="bg-white px-4 pt-6 pb-4 space-y-5">

        {/* 스터디 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 제목
          </label>
          <input
            type="text"
            maxLength={MAX_TITLE}
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="스터디 제목 입력"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
          />
          <div className="flex justify-between mt-1">
            {errors.title
              ? <p className="text-xs text-red-500">{errors.title}</p>
              : <span />}
            <span className="text-xs text-gray-400 ml-auto">
              {form.title.length}/{MAX_TITLE}
            </span>
          </div>
        </div>

        {/* 스터디 유형 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 유형 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex gap-5">
            {STUDY_TYPES.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => updateField("studyType", value)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    form.studyType === value
                      ? "border-[#4F7BF7]"
                      : "border-gray-300"
                  }`}
                >
                  {form.studyType === value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4F7BF7]" />
                  )}
                </div>
                <span
                  onClick={() => updateField("studyType", value)}
                  className="text-sm text-gray-700"
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
          {form.studyType === "offline" && (
            <p className="mt-2 text-xs text-[#4F7BF7] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F7BF7] inline-block" />
              해뜰음 에서 스터디팬을 모집합니다.
            </p>
          )}
          {errors.studyType && (
            <p className="mt-1 text-xs text-red-500">{errors.studyType}</p>
          )}
        </div>

        {/* 모집 인원 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            모집 인원 <span className="text-[#4F7BF7]">*</span>
            <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-xs font-bold cursor-default">?</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={3}
              max={99}
              value={form.maxMembers}
              onChange={(e) => updateField("maxMembers", e.target.value)}
              placeholder="3"
              className="w-24 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
            />
            <span className="text-sm text-gray-600">명</span>
          </div>
          {errors.maxMembers && (
            <p className="mt-1 text-xs text-red-500">{errors.maxMembers}</p>
          )}
        </div>

        {/* 스터디 소개 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 소개 <span className="text-[#4F7BF7]">*</span>
          </label>
          <textarea
            maxLength={MAX_INTRO}
            value={form.introduction}
            onChange={(e) => updateField("introduction", e.target.value)}
            placeholder="스터디 소개를 입력해 주세요."
            rows={5}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors resize-none"
          />
          <p className="text-xs text-gray-400 text-right mt-1">
            {form.introduction.length}/{MAX_INTRO}
          </p>
        </div>

        {/* 스터디 일정 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 일정
          </label>
          <textarea
            maxLength={MAX_SCHEDULE}
            value={form.schedule}
            onChange={(e) => updateField("schedule", e.target.value)}
            placeholder="스터디 일정을 입력해 주세요."
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors resize-none"
          />
          <p className="text-xs text-gray-400 text-right mt-1">
            {form.schedule.length}/{MAX_SCHEDULE}
          </p>
        </div>
      </div>

      {/* ── 상세 일정 ── */}
      <div className="bg-gray-50 px-4 pt-6 pb-6 mt-2 space-y-5">
        <h2 className="text-base font-bold text-gray-900">상세 일정</h2>

        {/* 스터디 요일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 요일
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`w-9 h-9 rounded-full text-sm font-medium border transition-colors ${
                  form.days.includes(day)
                    ? "bg-[#4F7BF7] border-[#4F7BF7] text-white"
                    : "bg-white border-gray-300 text-gray-600"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* 스터디 시작일 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 시작일 <span className="text-[#4F7BF7]">*</span>
          </label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
          />
          {errors.startDate && (
            <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
          )}
        </div>

        {/* 스터디 기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 기간 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="relative">
            <select
              value={form.durationWeeks}
              onChange={(e) => updateField("durationWeeks", e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors text-gray-700"
            >
              <option value="">스터디 기간 선택</option>
              {DURATIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.durationWeeks && (
            <p className="mt-1 text-xs text-red-500">{errors.durationWeeks}</p>
          )}
        </div>

        {/* 스터디 시간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 시간 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => updateField("startTime", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
              />
            </div>
            <span className="text-gray-400 text-sm shrink-0">~</span>
            <div className="relative flex-1">
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => updateField("endTime", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors"
              />
            </div>
          </div>
          {errors.startTime && (
            <p className="mt-1 text-xs text-red-500">{errors.startTime}</p>
          )}
          {errors.endTime && (
            <p className="mt-1 text-xs text-red-500">{errors.endTime}</p>
          )}
          {errors.timeRange && (
            <p className="mt-1 text-xs text-red-500">{errors.timeRange}</p>
          )}
        </div>
      </div>

      {/* ── 스터디 태그 설정 ── */}
      <div className="bg-white px-4 pt-6 pb-8 mt-2 space-y-5">
        <h2 className="text-base font-bold text-gray-900">스터디 태그 설정</h2>

        {/* 스터디 주제 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 주제 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => updateField("subject", s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  form.subject === s
                    ? "bg-[#4F7BF7] border-[#4F7BF7] text-white"
                    : "bg-white border-gray-300 text-gray-600"
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

        {/* 스터디 난이도 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 난이도 <span className="text-[#4F7BF7]">*</span>
          </label>
          <div className="flex gap-2">
            {DIFFICULTIES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => updateField("difficulty", value)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  form.difficulty === value
                    ? "bg-[#4F7BF7] border-[#4F7BF7] text-white"
                    : "bg-white border-gray-300 text-gray-600"
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

        {/* 검색 태그 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            검색 태그
            <span className="ml-1.5 text-xs text-gray-400 font-normal">
              ({form.tags.length}/{MAX_TAGS})
            </span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder={`태그 입력 (최대 ${MAX_TAGS}개)`}
              disabled={form.tags.length >= MAX_TAGS}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors disabled:bg-gray-50 disabled:text-gray-400"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={form.tags.length >= MAX_TAGS}
              className="px-4 py-2.5 rounded-lg bg-[#4F7BF7] text-white text-sm font-medium hover:bg-[#3d68e0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              추가
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-gray-700 leading-none"
                    aria-label={`${tag} 삭제`}
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
        </div>
      </div>
    </form>
  );
}
