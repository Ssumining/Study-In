import { useMemo } from "react";
import { useParams } from "react-router-dom";

type StudyDetailData = {
  id: number;
  thumbnailUrl: string;
  title: string;
  leader: { nickname: string; profileImageUrl: string; grade?: string };
  isOffline: boolean;
  location?: string;
  capacity: number;
  participants: number;
  description: string;
  days: string[];
  startDate: string; // YYYY-MM-DD
  time: string; // e.g. "19:00 ~ 21:00"
  durationWeeks: number;
  difficulty: "초급" | "중급" | "고급";
  subject: string;
  tags: string[];
};

export default function StudyDetail() {
  const { studyId } = useParams<{ studyId: string }>();

  // ✅ 오늘은 더미 데이터 기반. 나중에 API 연동으로 교체할 자리
  const data: StudyDetailData | null = useMemo(() => {
    if (!studyId) return null;

    return {
      id: Number(studyId),
      thumbnailUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
      title: "React 스터디 (주 2회) - 프로젝트 같이 해요",
      leader: {
        nickname: "StudyLeader",
        profileImageUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=60",
        grade: "정회원",
      },
      isOffline: true,
      location: "제주 제주시 (오프라인)",
      capacity: 10,
      participants: 6,
      description:
        "주 2회 같이 모여서 React 프로젝트를 진행합니다. 초급~중급 환영! 일정과 규칙은 스터디 내에서 합의해요.",
      days: ["화", "목"],
      startDate: "2026-03-03",
      time: "19:00 ~ 21:00",
      durationWeeks: 6,
      difficulty: "중급",
      subject: "프로젝트",
      tags: ["React", "TypeScript", "Vite", "협업"],
    };
  }, [studyId]);

  // ✅ 로딩/에러 상태는 기본 뼈대만 (오늘 이슈 범위)
  const isLoading = false;
  const isError = false;

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">
          데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-4 md:p-6">
      {/* 상단: 타이틀/요약 */}
      <section className="mb-6">
        <p className="mb-2 text-xs text-gray-400">studyId: {studyId}</p>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {data.subject}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {data.difficulty}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {data.isOffline ? "오프라인" : "온라인"}
          </span>
        </div>
      </section>

      {/* 썸네일 + 기본 정보 */}
      <section className="grid gap-6 md:grid-cols-[360px_1fr]">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={data.thumbnailUrl}
            alt="study thumbnail"
            className="h-56 w-full object-cover md:h-72"
          />
        </div>

        <div className="rounded-2xl border p-4 md:p-6">
          <div className="flex items-center gap-3">
            <img
              src={data.leader.profileImageUrl}
              alt="leader profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {data.leader.nickname}{" "}
                {data.leader.grade ? (
                  <span className="ml-2 text-xs text-gray-500">
                    ({data.leader.grade})
                  </span>
                ) : null}
              </p>
              <p className="text-xs text-gray-500">스터디장</p>
            </div>
          </div>

          <div className="mt-5 grid gap-2 text-sm">
            <p>
              <span className="text-gray-500">모집 인원:</span>{" "}
              {data.participants}/{data.capacity}
            </p>
            <p>
              <span className="text-gray-500">진행 요일:</span>{" "}
              {data.days.join(", ")}
            </p>
            <p>
              <span className="text-gray-500">시작일:</span> {data.startDate}
            </p>
            <p>
              <span className="text-gray-500">시간:</span> {data.time}
            </p>
            <p>
              <span className="text-gray-500">기간:</span> {data.durationWeeks}주
            </p>
            {data.isOffline && (
              <p>
                <span className="text-gray-500">장소:</span>{" "}
                {data.location ?? "-"}
              </p>
            )}
          </div>

          {/* 버튼 영역 (오늘은 UI만) */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-background">
              참가하기
            </button>
            <button className="rounded-xl border px-4 py-2 text-sm font-semibold">
              ♡ 좋아요
            </button>
          </div>
        </div>
      </section>

      {/* 소개 */}
      <section className="mt-8 rounded-2xl border p-4 md:p-6">
        <h2 className="text-lg font-bold">스터디 소개</h2>
        <p className="mt-3 whitespace-pre-line text-sm text-gray-700">
          {data.description}
        </p>
      </section>

      {/* 태그 */}
      <section className="mt-6 rounded-2xl border p-4 md:p-6">
        <h2 className="text-lg font-bold">태그</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* 댓글 자리(나중에 서원 컴포넌트 붙일 곳) */}
      <section className="mt-6 rounded-2xl border p-4 md:p-6">
        <h2 className="text-lg font-bold">댓글</h2>
        <p className="mt-2 text-sm text-gray-500">
          (댓글 컴포넌트가 이 위치에 추가될 예정입니다.)
        </p>
      </section>
    </div>
  );
}
