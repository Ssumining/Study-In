import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import heartIcon from '@/assets/base/icon-heart.svg'
import heartFillIcon from '@/assets/base/icon-heart-fill.svg'
import speakerIcon from '@/assets/base/icon-speaker-1.svg'
import personIcon from '@/assets/base/icon-person.svg'

// 임시 스터디 데이터 - 실제 데이터 연결 시 API로 교체 필요
const mockStudies = [
  { id: 1, category: '프로젝트', level: '초급', status: '모집 중!', location: '이여2동', title: '크롬 확장 프로그램 함께 구현 해보실 분 찾습니다.', members: 8 },
  { id: 2, category: '프로젝트', level: '초급', status: '모집 중!', location: '이여2동', title: '크롬 확장 프로그램 함께 구현 해보실 분 찾습니다.', members: 8 },
  { id: 3, category: '프로젝트', level: '초급', status: '모집 중!', location: '이여2동', title: '크롬 확장 프로그램 함께 구현 해보실 분 찾습니다.', members: 8 },
  { id: 4, category: '프로젝트', level: '초급', status: '모집 중!', location: '이여2동', title: '크롬 확장 프로그램 함께 구현 해보실 분 찾습니다.', members: 8 },
  { id: 5, category: '프로젝트', level: '초급', status: '모집 중!', location: '이여2동', title: '크롬 확장 프로그램 함께 구현 해보실 분 찾습니다.', members: 8 },
  { id: 6, category: '프로젝트', level: '초급', status: '모집 중!', location: '이여2동', title: '크롬 확장 프로그램 함께 구현 해보실 분 찾습니다.', members: 8 },
]

const ActivityTabs = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState<'my' | 'joined'>('my')
  const [activeSubTab, setActiveSubTab] = useState<'ended' | 'liked'>('ended')
  const [currentPage, setCurrentPage] = useState(1)
  const [likedStudies, setLikedStudies] = useState<number[]>([])
  const totalPages = 5

  // 하트 클릭시 좋아요 토글
  const toggleLike = (id: number) => {
    if (likedStudies.includes(id)) {
      setLikedStudies(likedStudies.filter((i) => i !== id))
    } else {
      setLikedStudies([...likedStudies, id])
    }
  }

  return (
    <div className="flex flex-col gap-0">

      {/* 상단 탭 - 내가 만든 스터디 / 참여 중인 스터디 */}
      <div className="flex">
        <button
          onClick={() => setActiveMainTab('my')}
          className={`flex-1 py-3 text-base font-medium ${
            activeMainTab === 'my'
              ? 'text-primary border-b-2 border-primary bg-activation'
              : 'text-gray-500 border-b border-gray-300'
          }`}
        >
          내가 만든 스터디
        </button>
        <button
          onClick={() => setActiveMainTab('joined')}
          className={`flex-1 py-3 text-base font-medium ${
            activeMainTab === 'joined'
              ? 'text-primary border-b-2 border-primary bg-activation'
              : 'text-gray-500 border-b border-gray-300'
          }`}
        >
          참여 중인 스터디
        </button>
      </div>

      {/* 하위 탭 - 종료된 스터디 / 관심 스터디 */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveSubTab('ended')}
          className={`flex-1 py-2 text-sm ${
            activeSubTab === 'ended'
              ? 'text-primary font-medium'
              : 'text-gray-500'
          }`}
        >
          종료된 스터디
        </button>
        <button
          onClick={() => setActiveSubTab('liked')}
          className={`flex-1 py-2 text-sm ${
            activeSubTab === 'liked'
              ? 'text-primary font-medium'
              : 'text-gray-500'
          }`}
        >
          관심 스터디
        </button>
      </div>

      {/* 스터디 카드 2열 그리드 */}
      <div className="grid grid-cols-2">
        {mockStudies.map((study) => (
          <div
            key={study.id}
            className="border border-gray-200 flex flex-col cursor-pointer"
            onClick={() => navigate(`/study/${study.id}`)}
          >
            {/* 카드 상단 - 모집상태 + 지역 */}
            <div className="flex justify-between items-center px-2 pt-2">
              <div className="flex items-center gap-1">
                <img src={speakerIcon} alt="모집중" className="w-3 h-3" />
                <span className="text-xs text-primary font-medium">{study.status}</span>
              </div>
              <span className="text-xs text-gray-500">{study.location}</span>
            </div>

            {/* 이미지 영역 */}
            <div className="w-full h-20 bg-gray-100 relative flex items-center justify-center">
              {/* 프로필 기본 이미지 */}
              <img src={personIcon} alt="스터디 이미지" className="w-10 h-10 opacity-30" />
              {/* 하트 아이콘 - 우측 하단 */}
              <button
                onClick={(e) => {
                  e.stopPropagation() // 카드 클릭 이벤트 방지
                  toggleLike(study.id)
                }}
                className="absolute bottom-2 right-2"
              >
                <img
                  src={likedStudies.includes(study.id) ? heartFillIcon : heartIcon}
                  alt="좋아요"
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* 카드 하단 내용 */}
            <div className="px-2 py-2 flex flex-col gap-1">
              {/* 카테고리 + 레벨 태그 */}
              <div className="flex gap-1">
                <span className="text-xs border border-gray-300 rounded px-1 text-gray-500">{study.category}</span>
                <span className="text-xs border border-gray-300 rounded px-1 text-gray-500">{study.level}</span>
              </div>
              {/* 제목 */}
              <p className="text-sm font-medium text-gray-900 line-clamp-2">{study.title}</p>
              {/* 멤버수 */}
              <div className="flex items-center gap-1">
                <img src={personIcon} alt="멤버" className="w-3 h-3" />
                <p className="text-xs text-gray-500">현재 {study.members}명이 신청했어요.</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 빈 상태 UI - 스터디가 없을 때 */}
      {mockStudies.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-gray-500">
          <p className="text-base">아직 참여한 스터디가 없어요!</p>
          <p className="text-sm">스터디를 만들거나 참여해보세요 😊</p>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-2 py-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full text-sm ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'text-gray-500'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

    </div>
  )
}

export default ActivityTabs