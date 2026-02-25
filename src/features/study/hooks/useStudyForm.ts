import { useState, useCallback, useRef } from "react";
import type { ChangeEvent, KeyboardEvent, FormEvent } from "react";
import type {
  StudyFormState,
  StudyFormErrors,
  StudyDay,
} from "@/types/study";

const INITIAL_STATE: StudyFormState = {
  thumbnail: null,
  thumbnailPreview: "",
  title: "",
  studyType: "",
  location: "",
  maxMembers: "",
  introduction: "",
  schedule: "",
  leaderIntro: "",
  days: [],
  startDate: "",
  durationWeeks: "",
  startTime: "",
  endTime: "",
  subject: "",
  difficulty: "",
  tags: [],
};

function validateForm(state: StudyFormState): StudyFormErrors {
  const errors: StudyFormErrors = {};

  if (!state.thumbnail) errors.thumbnail = "썸네일 이미지를 업로드해주세요.";
  if (!state.title.trim()) errors.title = "스터디 제목을 입력해주세요.";
  if (!state.studyType) errors.studyType = "스터디 유형을 선택해주세요.";
  if (state.studyType === "offline" && !state.location.trim()) {
    errors.location = "오프라인 스터디는 지역을 입력해주세요.";
  }
  if (state.maxMembers === "") {
    errors.maxMembers = "모집 인원을 입력해주세요.";
  } else if (Number(state.maxMembers) < 3 || Number(state.maxMembers) > 99) {
    errors.maxMembers = "모집 인원은 3명 이상 99명 이하여야 합니다.";
  }
  if (!state.startDate) errors.startDate = "시작일을 선택해주세요.";
  if (state.durationWeeks === "") errors.durationWeeks = "기간을 입력해주세요.";
  if (!state.startTime) errors.startTime = "시작 시간을 선택해주세요.";
  if (!state.endTime) errors.endTime = "종료 시간을 선택해주세요.";
  if (!state.subject) errors.subject = "주제를 선택해주세요.";
  if (!state.difficulty) errors.difficulty = "난이도를 선택해주세요.";
  if (state.tags.length === 0) errors.tags = "태그를 1개 이상 입력해주세요.";

  return errors;
}

function isFormValid(state: StudyFormState): boolean {
  if (!state.thumbnail) return false;
  if (!state.title.trim()) return false;
  if (!state.studyType) return false;
  if (state.studyType === "offline" && !state.location.trim()) return false;
  if (
    state.maxMembers === "" ||
    Number(state.maxMembers) < 3 ||
    Number(state.maxMembers) > 99
  )
    return false;
  if (!state.startDate) return false;
  if (state.durationWeeks === "") return false;
  if (!state.startTime) return false;
  if (!state.endTime) return false;
  if (!state.subject) return false;
  if (!state.difficulty) return false;
  if (state.tags.length === 0) return false;
  return true;
}

export function useStudyForm(onSubmit?: (state: StudyFormState) => void) {
  const [form, setForm] = useState<StudyFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<StudyFormErrors>({});
  const [tagInput, setTagInput] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = useCallback(
    <K extends keyof StudyFormState>(key: K, value: StudyFormState[K]) => {
      setForm((prev: StudyFormState) => ({ ...prev, [key]: value }));
      setIsDirty(true);
      setErrors((prev: StudyFormErrors) => {
        if (prev[key as keyof StudyFormErrors]) {
          const next = { ...prev };
          delete next[key as keyof StudyFormErrors];
          return next;
        }
        return prev;
      });
    },
    [],
  );

  const handleThumbnailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const allowed = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/tiff",
        "image/webp",
        "image/x-icon",
      ];
      if (!allowed.includes(file.type)) {
        setErrors((prev: StudyFormErrors) => ({
          ...prev,
          thumbnail: "지원하지 않는 이미지 형식입니다.",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev: StudyFormErrors) => ({
          ...prev,
          thumbnail: "이미지는 5MB 이하여야 합니다.",
        }));
        return;
      }

      const preview = URL.createObjectURL(file);
      setForm((prev: StudyFormState) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: preview,
      }));
      setErrors((prev: StudyFormErrors) => {
        const next = { ...prev };
        delete next.thumbnail;
        return next;
      });
      setIsDirty(true);
    },
    [],
  );

  const handleDayToggle = useCallback((day: StudyDay) => {
    setForm((prev: StudyFormState) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d: StudyDay) => d !== day)
        : [...prev.days, day],
    }));
    setIsDirty(true);
  }, []);

  const handleAddTag = useCallback(() => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (form.tags.includes(trimmed)) return;
    setForm((prev: StudyFormState) => ({ ...prev, tags: [...prev.tags, trimmed] }));
    setTagInput("");
    setErrors((prev: StudyFormErrors) => {
      const next = { ...prev };
      delete next.tags;
      return next;
    });
    setIsDirty(true);
  }, [tagInput, form.tags]);

  const handleRemoveTag = useCallback((tag: string) => {
    setForm((prev: StudyFormState) => ({ ...prev, tags: prev.tags.filter((t: string) => t !== tag) }));
    setIsDirty(true);
  }, []);

  const handleTagInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag();
      }
    },
    [handleAddTag],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const validationErrors = validateForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      onSubmit?.(form);
    },
    [form, onSubmit],
  );

  const handleReset = useCallback(() => {
    setForm(INITIAL_STATE);
    setErrors({});
    setTagInput("");
    setIsDirty(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const isValid = isFormValid(form);

  return {
    form,
    errors,
    tagInput,
    setTagInput,
    isDirty,
    isValid,
    fileInputRef,
    updateField,
    handleThumbnailChange,
    handleDayToggle,
    handleAddTag,
    handleRemoveTag,
    handleTagInputKeyDown,
    handleSubmit,
    handleReset,
  };
}
