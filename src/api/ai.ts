const CHATGPT_API_URL = 'https://dev.wenivops.co.kr/services/openai-api';

export interface AiContext {
  title: string;
  subject: string;
  difficulty: string;
  durationWeeks: string;
  days: string[];
  curriculum?: string;
}

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
};

function buildMessages(context: AiContext, field: 'introduction' | 'schedule') {
  const { title, subject, difficulty, durationWeeks, days, curriculum } = context;
  const diffLabel = DIFFICULTY_LABEL[difficulty] ?? difficulty;
  const daysText = days.length > 0 ? days.join(', ') : '미정';
  const info = `스터디 제목: ${title || '미정'}\n주제: ${subject || '미정'}\n난이도: ${diffLabel || '미정'}\n기간: ${durationWeeks ? `${durationWeeks}주` : '미정'}\n진행 요일: ${daysText}`;

  if (field === 'schedule') {
    return [
      { role: 'system', content: '당신은 스터디 커리큘럼 설계 전문가입니다. 한국어로 답변해주세요.' },
      {
        role: 'user',
        content: `${info}\n\n위 정보를 바탕으로 주차별(Week 1, Week 2...) 커리큘럼을 작성해주세요. 각 주차에 학습 주제와 목표를 포함해주세요.`,
      },
    ];
  }

  const curriculumSection = curriculum
    ? `\n\n커리큘럼:\n${curriculum}`
    : '';

  return [
    { role: 'system', content: '당신은 스터디 소개글 작성 전문가입니다. 한국어로 답변해주세요.' },
    {
      role: 'user',
      content: `${info}${curriculumSection}\n\n위 정보를 바탕으로 스터디 소개글을 작성해주세요.`,
    },
  ];
}

export async function generateAiText(
  context: AiContext,
  field: 'introduction' | 'schedule',
): Promise<string> {
  const messages = buildMessages(context, field);
  const res = await fetch(CHATGPT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messages),
  });
  if (!res.ok) throw new Error(`AI API error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content as string;
}
