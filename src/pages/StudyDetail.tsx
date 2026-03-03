import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import heartIcon from "@/assets/base/icon-heart.svg";
import heartFillIcon from "@/assets/base/icon-heart-fill.svg";

type StudyDetailData = {
  id: number;
  thumbnailUrl: string;
  title: string;
  hashtags: string;
  chips: { label: string }[];
  schedule: {
    startDateLabel: string;
    startDateValue: string;
    timeLabel: string;
    timeValue: string;
    capacityLabel: string;
    capacityValue: string;
  };
  introTitle: string;
  introBody1: string;
  introBody2: string;
  planTitle: string;
  planItems: string[];
  leader: {
    nickname: string;
    badge: string;
    profileImageUrl: string;
    bubble: string;
  };
};

type CommentItem = {
  id: number;
  author: string;
  date: string;
  body: string;
  isSecret?: boolean;
  isReply?: boolean;
  replyTo?: string;
  leaderReply?: boolean;
};

export default function StudyDetail() {
  const { studyId } = useParams<{ studyId: string }>();

  const [liked, setLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  // ✅ 댓글 작성(바텀시트)
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  // 더미 플래그(나중에 API 연결)
  const isMember = true; // 정회원 여부
  const isLeader = false; // 스터디장 여부
  const isFull = false; // 모집마감 여부

  const data: StudyDetailData | null = useMemo(() => {
    if (!studyId) return null;

    return {
      id: Number(studyId),
      thumbnailUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
      title:
        "크롬 확장 프로그램 함께 구현 해보실 분 찾습니다.\n(맞춤법 검사, 번역 서비스입니다.)",
      hashtags: "#Python #Google #크롬확장프로그램 #협업프로젝트",
      chips: [{ label: "프로젝트" }, { label: "중급" }, { label: "오프라인" }],
      schedule: {
        startDateLabel: "시작일",
        startDateValue: "2026-03-03",
        timeLabel: "시간",
        timeValue: "19:00 ~ 21:00",
        capacityLabel: "모집 인원",
        capacityValue: "8/10",
      },
      introTitle: "스터디 소개",
      introBody1:
        "이 스터디는 같이 만들면서 시작합니다! 자기만의 리얼트를 위해서 함께하는 스터디입니다. 일단 해보고, 기간/규칙은 합의해요.",
      introBody2:
        "취업용 하는 거 아니고, 같이 하니까 하는 거예요. 부담 없이 오세요.",
      planTitle: "스터디 일정",
      planItems: [
        "1주차: 개발 환경 셋팅",
        "2주차: 핵심 기능 구현",
        "3주차: API 연동 / 상태관리",
        "4주차: 테스트 / 리팩토링",
        "5주차: 배포 / 문서화",
      ],
      leader: {
        nickname: "파이썬 마술사",
        badge: "노션",
        profileImageUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=60",
        bubble:
          "안녕하세요! 파이썬마술사입니다.\n\n스터디는 편하게 시작하고, 같이 정리하면서 성장해요.\n\n부담 없이 오셔서 함께 재미있게 만들어봐요!",
      },
    };
  }, [studyId]);

  const comments: CommentItem[] = useMemo(
    () => [
      {
        id: 1,
        author: "스터디왕",
        date: "2026.03.01",
        body: "참여하고 싶습니다! 초보도 가능할까요?",
      },
      {
        id: 2,
        author: "파이썬 마술사",
        date: "2026.03.01",
        body: "네! 초보도 환영합니다 😊",
        isReply: true,
        replyTo: "스터디왕",
        leaderReply: true,
      },
      {
        id: 3,
        author: "익명",
        date: "2026.03.02",
        body: "비밀댓글입니다.",
        isSecret: true,
      },
    ],
    []
  );

  // ✅ 초기 댓글 리스트 state로 관리(등록하면 바로 반영)
  const [commentList, setCommentList] = useState<CommentItem[]>(comments);

  if (!data) return <div className="px-4 py-6">잘못된 접근입니다.</div>;

  // 버튼 비활성 사유
  const joinDisabledReason = !isMember
    ? "정회원만 참가할 수 있어요."
    : isFull
      ? "모집 인원이 마감되었어요."
      : null;

  const leaveDisabledReason = isLeader ? "스터디장은 탈퇴할 수 없어요." : null;

  const actionDisabled = isJoined
    ? Boolean(leaveDisabledReason)
    : Boolean(joinDisabledReason);

  const helperText = isJoined ? leaveDisabledReason : joinDisabledReason;

  const handleJoinToggle = () => {
    if (actionDisabled) return;
    setIsJoined((prev) => !prev);
  };

  const primaryButtonText = isJoined ? "채팅방 가기" : "참여하기";

  const handleOpenComment = () => {
    setIsCommentOpen(true);
  };

  const handleCloseComment = () => {
    setIsCommentOpen(false);
    setCommentText("");
  };

  const handleSubmitComment = () => {
    const text = commentText.trim();
    if (!text) return;

    const today = new Date();
    const yy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const newComment: CommentItem = {
      id: Date.now(),
      author: "나",
      date: `${yy}.${mm}.${dd}`,
      body: text,
    };

    setCommentList((prev) => [newComment, ...prev]);
    setCommentText("");
    setIsCommentOpen(false);
  };

  return (
    <div className="w-full bg-background">
      <div className="mx-auto w-full max-w-[390px] px-4 pb-[92px] pt-4">
        {/* 칩 */}
        <div className="mb-3 flex flex-wrap gap-2">
          {data.chips.map((c) => (
            <span
              key={c.label}
              className="rounded-full bg-gray-100 px-3 py-[6px] text-sm font-medium text-gray-900"
            >
              {c.label}
            </span>
          ))}
        </div>

        {/* 썸네일 */}
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={data.thumbnailUrl}
            alt="thumbnail"
            className="h-[190px] w-full object-cover"
          />
        </div>

        {/* 제목 + 해시태그 */}
        <h1 className="mt-4 whitespace-pre-line text-xl font-bold leading-[1.35] text-gray-900">
          {data.title}
        </h1>
        <p className="mt-2 text-sm font-medium text-gray-500">{data.hashtags}</p>

        {/* 일정 카드 */}
        <section className="mt-4 rounded-2xl border border-gray-300 bg-background p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">모집 중 (0~10)</p>
          </div>

          <h2 className="text-15 font-bold text-gray-900">스터디 일정</h2>

          <div className="mt-3 grid gap-2 text-13 text-gray-900">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">{data.schedule.startDateLabel}</span>
              <span className="font-medium">{data.schedule.startDateValue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">{data.schedule.timeLabel}</span>
              <span className="font-medium">{data.schedule.timeValue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">{data.schedule.capacityLabel}</span>
              <span className="font-semibold">{data.schedule.capacityValue}</span>
            </div>
          </div>
        </section>

        {/* 스터디 소개 카드 */}
        <section className="mt-4 rounded-2xl border border-gray-300 bg-background p-4 shadow-sm">
          <h2 className="text-15 font-bold text-gray-900">{data.introTitle}</h2>
          <p className="mt-3 whitespace-pre-line text-13 leading-[1.6] text-gray-700">
            {data.introBody1}
          </p>
          <p className="mt-3 whitespace-pre-line text-13 leading-[1.6] text-gray-700">
            {data.introBody2}
          </p>
        </section>

        {/* 스터디 일정(리스트) 카드 */}
        <section className="mt-4 rounded-2xl border border-gray-300 bg-background p-4 shadow-sm">
          <h2 className="text-15 font-bold text-gray-900">{data.planTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-13 text-gray-800">
            {data.planItems.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </section>

        {/* 그룹장 소개 카드 */}
        <section className="mt-4 rounded-2xl border border-gray-300 bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={data.leader.profileImageUrl}
              alt="leader"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex items-center gap-2">
              <p className="text-13 font-bold text-gray-900">{data.leader.nickname}</p>
              <span className="rounded-full bg-gray-100 px-2 py-[2px] text-sm font-semibold text-gray-700">
                {data.leader.badge}
              </span>
            </div>
          </div>

          {/* 말풍선 */}
          <div className="mt-3 rounded-2xl bg-warning-light px-4 py-4">
            <p className="whitespace-pre-line text-13 font-semibold leading-[1.6] text-gray-900">
              {data.leader.bubble}
            </p>
          </div>
        </section>

        {/* 그룹장에게 질문하기 */}
        <section className="mt-4 rounded-2xl border border-gray-300 bg-background p-4 shadow-sm">
          <h2 className="text-15 font-bold text-gray-900">그룹장에게 질문하기</h2>

          {/* 작성하기 버튼 */}
          <button
            type="button"
            onClick={handleOpenComment}
            className="mt-3 h-11 w-full rounded-xl border border-gray-300 bg-background text-13 font-semibold text-gray-900"
          >
            작성하기
          </button>

          {/* 댓글 리스트 */}
          <div className="mt-4 space-y-4">
            {commentList.map((c) => (
              <div key={c.id} className={c.isReply ? "pl-6" : ""}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-gray-100" />
                    <div className="flex items-center gap-2">
                      <p className="text-13 font-bold text-gray-900">
                        {c.isReply ? `↳ ${c.author}` : c.author}
                        {c.leaderReply ? <span className="ml-1">👑</span> : null}
                      </p>
                      {!c.isReply ? (
                        <button type="button" className="text-13 text-gray-500">
                          답글달기
                        </button>
                      ) : null}
                    </div>
                  </div>
                  <p className="text-13 text-gray-500">{c.date}</p>
                </div>

                <div className="mt-2 pl-11">
                  <p className="text-13 text-gray-700">
                    {c.isSecret ? "🔒 " : ""}
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {helperText ? (
          <p className="mt-3 text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>

      {/* ✅ 댓글 작성 바텀시트 */}
      {isCommentOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40">
          <button
            type="button"
            aria-label="닫기"
            className="absolute inset-0"
            onClick={handleCloseComment}
          />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[390px] rounded-t-2xl bg-white p-4">
            <h3 className="mb-3 text-15 font-bold text-gray-900">댓글 작성</h3>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="h-24 w-full rounded-xl border border-gray-300 p-3 text-13"
              placeholder="댓글을 입력하세요"
            />

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="h-12 flex-1 rounded-xl border border-gray-300 text-13 font-semibold"
                onClick={handleCloseComment}
              >
                취소
              </button>
              <button
                type="button"
                className="h-12 flex-1 rounded-xl bg-primary text-13 font-semibold text-white hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-gray-300"
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-300 bg-background">
        <div className="mx-auto flex w-full max-w-[390px] items-center gap-3 px-4 py-3">
          {isLeader ? (
            <>
              {/* 수정 */}
              <button
                type="button"
                className="flex h-12 w-[72px] items-center justify-center rounded-xl border border-gray-300 bg-background text-13 font-semibold text-gray-900"
              >
                수정
              </button>

              {/* 공유 */}
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 bg-background"
                aria-label="공유"
              >
                <span className="text-15 text-gray-700">⤴</span>
              </button>

              {/* 좋아요 */}
              <button
                type="button"
                onClick={() => setLiked((prev) => !prev)}
                aria-pressed={liked}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 bg-background"
                aria-label="좋아요"
              >
                <img
                  src={liked ? heartFillIcon : heartIcon}
                  alt="heart"
                  className="h-6 w-6"
                />
              </button>

              {/* 채팅방 */}
              <button
                type="button"
                className="h-12 flex-1 rounded-xl bg-primary text-15 font-semibold text-background hover:bg-primary-light"
              >
                채팅방 가기
              </button>
            </>
          ) : (
            <>
              {/* 공유하기 */}
              <button
                type="button"
                className="flex h-12 w-[96px] items-center justify-center gap-2 rounded-xl border border-gray-300 bg-background text-13 font-semibold text-gray-900"
              >
                <span>⤴</span>
                공유하기
              </button>

              {/* 좋아요 */}
              <button
                type="button"
                onClick={() => setLiked((prev) => !prev)}
                aria-pressed={liked}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-300 bg-background"
                aria-label="좋아요"
              >
                <img
                  src={liked ? heartFillIcon : heartIcon}
                  alt="heart"
                  className="h-6 w-6"
                />
              </button>

              {/* 참여/채팅 */}
              <button
                type="button"
                onClick={() => {
                  if (!isJoined) handleJoinToggle();
                  // isJoined면 채팅 이동(나중에 라우팅/링크 연결)
                }}
                disabled={!isJoined ? actionDisabled : false}
                className={`h-12 flex-1 rounded-xl text-15 font-semibold transition ${
                  !isJoined && actionDisabled
                    ? "cursor-not-allowed bg-gray-300 text-background"
                    : "bg-primary text-background hover:bg-primary-light"
                }`}
              >
                {primaryButtonText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}