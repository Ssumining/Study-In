import { GitHubCalendar } from 'react-github-calendar'
import { useNavigate } from 'react-router-dom'
import personIcon from '@/assets/base/icon-person.svg'

// 내 프로필인지 다른 사람 프로필인지 구분하는 타입
interface ProfileCardProps {
  isMyProfile?: boolean // true: 내 프로필, false: 다른 사람 프로필
}

const ProfileCard = ({ isMyProfile = true }: ProfileCardProps) => {
  // 페이지 이동을 위한 훅
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center px-4 py-6 gap-4 bg-background">

      {/* 프로필 이미지 - 실제 데이터 연결 시 src 교체 필요 */}
      <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
        <img
          src={personIcon}
          alt="프로필 이미지"
          className="w-14 h-14"
        />
      </div>

      {/* 닉네임 */}
      <h2 className="text-lg font-bold text-gray-900">파이썬 연금술사</h2>

      {/* 레벨 - 실제 데이터 연결 시 교체 필요 */}
      <span className="text-sm text-primary font-medium">Lv. 초록잔디</span>

      {/* 소개글 */}
      <p className="text-base text-gray-500 text-center bg-gray-100 rounded-lg px-4 py-3 w-full">
        나는야 파이썬을 아주 잘하는 파이썬 보안관!
      </p>

      {/* 구분선 */}
      <div className="w-full border-t border-gray-300" />

      {/* 정보 목록 */}
      <div className="w-full flex flex-col gap-4">

        {/* 이메일은 항상 표시 */}
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900 w-28">이메일(ID)</span>
          <span className="text-base text-gray-700 flex-1 text-right">paul-lab@naver.com</span>
        </div>

        {/* 내 프로필일 때만 이름, 전화번호 표시 */}
        {isMyProfile && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-900 w-28">이름</span>
              <span className="text-base text-gray-700 flex-1 text-right">홍길동</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-900 w-28">전화번호</span>
              <span className="text-base text-gray-700 flex-1 text-right">010-8888-9999</span>
            </div>
          </>
        )}

        {/* 지역 - 항상 표시 */}
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900 w-28">내 지역</span>
          <span className="text-base text-gray-700 flex-1 text-right">제주특별자치도 제주시 애월읍</span>
        </div>

        {/* GitHub + 잔디 - 항상 표시 */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900 w-28">GitHub</span>
            <span className="text-base text-gray-700 flex-1 text-right">dkdkdkdk</span>
          </div>
          {/* GitHub 잔디 - username은 실제 데이터 연결 시 교체 필요 */}
          <div className="w-full overflow-x-auto">
            <GitHubCalendar
              username="torvalds"
              blockSize={8}
              blockMargin={2}
              fontSize={8}
              colorScheme="light"
            />
          </div>
        </div>

      </div>

      {/* 구분선 */}
      <div className="w-full border-t border-gray-300" />

      {/* 관심 분야 태그 - 항상 표시 */}
      <div className="w-full">
        <p className="text-base font-medium text-gray-900 mb-2">관심 분야</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-activation text-primary text-sm px-3 py-1 rounded-full">Python</span>
          <span className="bg-activation text-primary text-sm px-3 py-1 rounded-full">크롬확장프로그램</span>
          <span className="bg-activation text-primary text-sm px-3 py-1 rounded-full">사이드프로젝트</span>
          <span className="bg-activation text-primary text-sm px-3 py-1 rounded-full">JS</span>
          <span className="bg-activation text-primary text-sm px-3 py-1 rounded-full">Django</span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full border-t border-gray-300" />

      {/* 내 프로필일 때만 수정하기 버튼 표시 */}
      {isMyProfile && (
        <button
          onClick={() => navigate('/profile/edit')}
          className="w-40 py-2 border border-gray-300 rounded-lg text-base text-gray-700 hover:bg-gray-100"
        >
          수정하기
        </button>
      )}

    </div>
  )
}

export default ProfileCard