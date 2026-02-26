import { useState } from 'react'

const ProfileEditForm = () => {
  // 닉네임 입력값 상태 관리
  const [nickname, setNickname] = useState('')
  // 닉네임 중복확인 여부 상태
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  // 소개 입력값 상태 관리
  const [bio, setBio] = useState('')
  // 지역 입력값 상태 관리
  const [region, setRegion] = useState('')
  // GitHub 입력값 상태 관리
  const [github, setGithub] = useState('')

  // 변경사항 있고 유효성 검사 통과시 저장하기 버튼 활성화
  // 닉네임 변경시 중복확인 필수
  const isSaveEnabled = nickname !== '' && isNicknameChecked

  return (
    <div className="flex flex-col px-4 py-6 gap-4 bg-background">

      {/* 프로필 이미지 수정 - 실제 데이터 연결 시 이미지 업로드 기능 추가 필요 */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
          <img
            src="https://via.placeholder.com/96"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <button className="text-base text-primary font-medium">
          이미지 변경
        </button>
      </div>

      {/* 닉네임 - 변경시 중복확인 필수 */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium text-gray-900">닉네임</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              setIsNicknameChecked(false) // 닉네임 변경시 중복확인 초기화
            }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary"
          />
          <button
            onClick={() => setIsNicknameChecked(true)} // 실제 중복확인 API 연결 필요
            className="px-3 py-2 bg-primary text-background text-base rounded-lg"
          >
            중복확인
          </button>
        </div>
        {/* 중복확인 완료 메시지 */}
        {isNicknameChecked && (
          <p className="text-sm text-primary">사용 가능한 닉네임입니다!</p>
        )}
      </div>

      {/* 소개 */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium text-gray-900">소개</label>
        <textarea
          placeholder="소개를 입력해주세요"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 resize-none h-24 focus:outline-none focus:border-primary"
        />
      </div>

      {/* 선호 지역 */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium text-gray-900">내 지역</label>
        <input
          type="text"
          placeholder="지역 입력"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* GitHub */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium text-gray-900">GitHub</label>
        <input
          type="text"
          placeholder="GitHub 아이디 입력"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* 관심 분야 태그 - 실제 데이터 연결 시 태그 추가/삭제 기능 필요 */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium text-gray-900">관심 분야</label>
        <div className="flex flex-wrap gap-2">
          <span className="bg-activation text-primary text-sm px-3 py-1 rounded-full">Python</span>
          <span className="bg-activation text-primary text-sm px-3 py-1 rounded-full">JS</span>
        </div>
      </div>

      {/* 저장하기 버튼 - 변경사항 있고 유효성 검사 통과시 활성화 */}
      <button
        disabled={!isSaveEnabled}
        className={`mt-4 w-full py-2 rounded-lg text-base ${
          isSaveEnabled
            ? 'bg-primary text-background cursor-pointer hover:bg-primary-light'
            : 'bg-gray-300 text-background cursor-not-allowed'
        }`}
      >
        저장하기
      </button>

    </div>
  )
}

export default ProfileEditForm