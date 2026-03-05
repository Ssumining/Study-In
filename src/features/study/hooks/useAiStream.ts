import { useState, useCallback } from "react";
import { generateAiText } from "@/api/ai";
import type { AiContext } from "@/api/ai";

export function useAiStream(
  onResult: (field: "schedule" | "introduction", text: string) => void,
) {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 커리큘럼(schedule) → 소개글(introduction) 순차 생성.
   * existingSchedule 이 있으면 커리큘럼 생성을 건너뛰고 바로 소개글 생성.
   */
  const trigger = useCallback(
    async (context: AiContext, existingSchedule: string) => {
      setIsLoading(true);
      try {
        let curriculum = existingSchedule;
        if (!curriculum) {
          curriculum = await generateAiText(context, "schedule");
          onResult("schedule", curriculum);
        }
        const introduction = await generateAiText(
          { ...context, curriculum },
          "introduction",
        );
        onResult("introduction", introduction);
      } catch {
        // 에러 시 조용히 실패
      } finally {
        setIsLoading(false);
      }
    },
    [onResult],
  );

  return { isLoading, trigger };
}
