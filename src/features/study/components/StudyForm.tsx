import { useState } from "react";
import type { ChangeEvent, KeyboardEvent, FormEvent, RefObject } from "react";
import iconImage from "@/assets/base/icon-Image.svg";
import iconLocation from "@/assets/base/icon-location.svg";
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

const TAG_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Vue", "Angular",
  "Python", "Java", "Spring", "Node.js", "Express",
  "Flutter", "Swift", "Kotlin", "Go", "Rust",
  "알고리즘", "자료구조", "CS", "데이터베이스", "네트워크",
  "AWS", "Docker", "Git", "머신러닝", "딥러닝",
  "데이터분석", "SQL", "포트폴리오", "취업", "코딩테스트",
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
  handleAddTagDirect: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
  handleTagInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  handleReset: () => void;
  // 프로필에서 인증된 지역 — 추후 API 연결 시 실제 값으로 주입
  userLocation?: string;
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
  handleAddTagDirect,
  handleRemoveTag,
  handleTagInputKeyDown,
  handleSubmit,
  userLocation,
}: StudyFormProps) {
  const [isTagFocused, setIsTagFocused] = useState(false);

  const filteredTagOptions = TAG_OPTIONS.filter(
    (t) =>
      !form.tags.includes(t) &&
      (tagInput === "" || t.toLowerCase().includes(tagInput.toLowerCase())),
  ).slice(0, 8);

  const showTagDropdown =
    isTagFocused && form.tags.length < MAX_TAGS && filteredTagOptions.length > 0;

  return (
    <form id="study-create-form" onSubmit={handleSubmit} noValidate>

      {/* ── 카드: 대표이미지 ~ 모집인원 ── */}
      <div className="mx-4 mt-2 bg-white rounded-2xl overflow-hidden border border-gray-200">

        {/* 대표 이미지 */}
        <div
          className="relative w-full bg-gray-100 cursor-pointer"
          style={{ minWidth: "358px", minHeight: "358px" }}
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
          {!form.thumbnailPreview && (
            <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center">
              <img src={iconImage} alt="" className="w-5 h-5" />
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
        </div>
        {errors.thumbnail && (
          <p className="px-4 pt-1.5 text-xs text-red-500">{errors.thumbnail}</p>
        )}

        {/* 스터디 제목 / 유형 / 지역 / 모집인원 */}
        <div className="px-4 pt-5 pb-5 space-y-5">

          {/* 스터디 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              스터디 제목
            </label>
            <textarea
              maxLength={MAX_TITLE}
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="스터디 제목 입력"
              className="w-full min-h-[100px] border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4F7BF7] transition-colors resize-none align-top"
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

          {/* 구분선 */}
          <div className="-mx-4 border-t border-gray-100" />

          {/* 스터디 유형 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              스터디 유형 <span className="text-red-500">*</span>
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
                <img src={iconLocation} alt="" className="w-3.5 h-3.5" />
                {userLocation ?? "내 지역"} 에서 스터디원을 모집합니다.
              </p>
            )}
            {errors.studyType && (
              <p className="mt-1 text-xs text-red-500">{errors.studyType}</p>
            )}
          </div>


          {/* 모집 인원 */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                모집 인원 <span className="text-red-500">*</span>
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-xs font-bold cursor-default">?</span>
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={3}
                  max={99}
                  value={form.maxMembers}
                  onChange={(e) => updateField("maxMembers", e.target.value)}
                  placeholder="3"
                  className="w-16 border-0 border-b border-gray-400 px-1 py-1 text-sm text-center focus:outline-none focus:border-[#4F7BF7] transition-colors bg-transparent"
                />
                <span className="text-sm text-gray-600">명</span>
              </div>
            </div>
            {errors.maxMembers && (
              <p className="mt-1 text-xs text-red-500">{errors.maxMembers}</p>
            )}
          </div>

        </div>
      </div>
      {/* ── 카드 끝 ── */}

      {/* ── 소개 / 일정 ── */}
      <div className="bg-white px-4 pt-6 pb-4 mt-4 space-y-5">

        {/* 스터디 소개 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            스터디 소개 <span className="text-red-500">*</span>
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
            스터디 시작일 <span className="text-red-500">*</span>
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
            스터디 기간 <span className="text-red-500">*</span>
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
            스터디 시간 <span className="text-red-500">*</span>
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
            스터디 주제 <span className="text-red-500">*</span>
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
            스터디 난이도 <span className="text-red-500">*</span>
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
          <div className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                onFocus={() => setIsTagFocused(true)}
                onBlur={() => setIsTagFocused(false)}
                placeholder="태그 검색 또는 직접 입력"
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
            {showTagDropdown && (
              <ul className="absolute z-10 left-0 right-[4.5rem] mt-1 bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-y-auto">
                {filteredTagOptions.map((option) => (
                  <li
                    key={option}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleAddTagDirect(option);
                    }}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#4F7BF7] cursor-pointer transition-colors"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
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
