import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../api/axios'; // 수민님의 axios 설정 임포트
import { Study } from '../../../types/study'; // 우리가 아까 고친 그 타입!

export const useStudyList = (category: string) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        setIsLoading(true);
        // 서버의 '/studies' 주소에서 데이터를 가져옵니다. 카테고리가 있으면 파라미터로 전달합니다.
        const response = await axiosInstance.get('/studies', {
          params: { category: category !== 'all' ? category : undefined }
        });
        setStudies(response.data);
      } catch (err) {
        setError('스터디 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, [category]); // 카테고리가 바뀔 때마다 데이터를 다시 불러옵니다.

  return { studies, isLoading, error };
};