import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import heartIcon from "@/assets/base/icon-heart.svg";
import heartFillIcon from "@/assets/base/icon-heart-fill.svg";
import shareIcon from "@/assets/base/icon-Share.svg";

/* ========================
   TYPES

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

/* ========================
   PAGE
======================== */

export default function StudyDetail() {
  const { studyId } = useParams<{ studyId: string }>();

  const [liked, setLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const isMember = true;
  const isLeader = false;
  const isFull = false;

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
        "이 스터디는 같이 만들면서 시작합니다! 자기만의 리얼트를 위해서 함께하는 스터디입니다.",

      introBody2:
        "취업용 하는 거 아니고, 같이 하니까 하는 거예요. 부담 없이 오세요.",

      planTitle: "스터디 일정",

      planItems: [
        "1주차: 개발 환경 셋팅",
        "2주차: 핵심 기능 구현",
        "3주차: API 연동 / 상태관리",
        "4주차: 테스트 / 리팩토링",
      ],

      leader: {
        nickname: "파이썬 마술사",
        badge: "노션",
        profileImageUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=60",

        bubble:
          "안녕하세요! 파이썬마술사입니다.\n\n스터디는 편하게 시작하고 같이 성장하는 방식으로 운영합니다.",
      },
    };
  }, [studyId]);

  const comments: CommentItem[] = [
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
  ];

  const [commentList, setCommentList] = useState<CommentItem[]>(comments);

  if (!data) return <div className="px-4 py-6">잘못된 접근입니다.</div>;

  const primaryButtonText = isJoined ? "채팅방 가기" : "참여하기";

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

        {/* chips */}
        <div className="mb-3 flex flex-wrap gap-2">
          {data.chips.map((c) => (
            <span
              key={c.label}
              className="rounded-full bg-gray-100 px-3 py-[6px] text-sm font-medium"
            >
              {c.label}
            </span>
          ))}
        </div>

        {/* thumbnail */}
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={data.thumbnailUrl}
            alt="thumbnail"
            className="h-[190px] w-full object-cover"
          />
        </div>

        <h1 className="mt-4 whitespace-pre-line text-xl font-bold">
          {data.title}
        </h1>

        <p className="mt-2 text-sm text-gray-500">{data.hashtags}</p>

        {/* schedule */}
        <section className="mt-4 rounded-2xl border p-4 bg-white">

          <h2 className="text-[15px] font-bold">스터디 일정</h2>

          <div className="mt-3 space-y-2 text-sm">

            <div className="flex justify-between">
              <span>{data.schedule.startDateLabel}</span>
              <span>{data.schedule.startDateValue}</span>
            </div>

            <div className="flex justify-between">
              <span>{data.schedule.timeLabel}</span>
              <span>{data.schedule.timeValue}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>{data.schedule.capacityLabel}</span>
              <span>{data.schedule.capacityValue}</span>
            </div>

          </div>
        </section>

        {/* intro */}
        <section className="mt-4 rounded-2xl border p-4 bg-white">

          <h2 className="font-bold">{data.introTitle}</h2>

          <p className="mt-2 whitespace-pre-line text-sm">
            {data.introBody1}
          </p>

          <p className="mt-2 whitespace-pre-line text-sm">
            {data.introBody2}
          </p>

        </section>

        {/* comment */}
        <section className="mt-4 rounded-2xl border p-4 bg-white">

          <h2 className="font-bold">그룹장에게 질문하기</h2>

          <button
            onClick={() => setIsCommentOpen(true)}
            className="mt-3 w-full border rounded p-2"
          >
            작성하기
          </button>

          <div className="mt-4 space-y-4">

            {commentList.map((c) => (
              <div key={c.id}>

                <p className="font-bold text-sm">
                  {c.author} {c.leaderReply && "👑"}
                </p>

                <p className="text-xs text-gray-400">{c.date}</p>

                <p className="text-sm">{c.body}</p>

              </div>
            ))}

          </div>
        </section>

        </section>

      </div>

      {/* bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white">

        <div className="mx-auto flex h-[70px] max-w-[390px] items-center gap-2 px-4">

          <button className="flex h-[50px] w-[110px] items-center justify-center gap-2 rounded border">
            <img src={shareIcon} className="h-5 w-5" />
            공유
          </button>

          <button
            onClick={() => setLiked((p) => !p)}
            className="flex h-[50px] w-[50px] items-center justify-center rounded border"
          >
            <img
              src={liked ? heartFillIcon : heartIcon}
              className="h-5 w-5"
            />
          </button>

          <button
            onClick={() => setIsJoined((p) => !p)}
            className="h-[50px] flex-1 rounded bg-primary text-white"
          >
            {primaryButtonText}
          </button>

        </div>
      </div>
    </div>
  );
}