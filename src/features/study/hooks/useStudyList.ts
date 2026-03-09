import { useState, useEffect } from "react";
import { axiosInstance } from "../../../api/axios";
import { Study } from "../../../types/study";
import { normalizeStudy } from "@/utils/study";

export const PAGE_SIZE = 8;

// activeTab → API study_status 파라미터 ID 매핑 (서버사이드 필터링)
const STATUS_MAP: Record<string, number> = {
  "모집 중 스터디": 1,
  "진행 중 스터디": 3,
};

export const useStudyList = (
  category: string,
  searchTerm: string = "",
  activeTab: string = "최신 스터디",
  page: number = 1,
) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axiosInstance.get("/study/", {
          params: {
            search: searchTerm || undefined,
            study_status: STATUS_MAP[activeTab] ?? undefined,
            page,
            limit: PAGE_SIZE,
          },
        });

        const raw = response.data;
        const results = Array.isArray(raw.results)
          ? raw.results
          : Array.isArray(raw)
            ? raw
            : [];

        setTotalCount(raw.count ?? results.length);
        setStudies(results.map(normalizeStudy));
      } catch (err) {
        setError("스터디 목록을 불러오는 데 실패했습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, [category, searchTerm, activeTab, page]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return { studies, isLoading, error, totalCount, totalPages };
};