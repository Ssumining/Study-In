import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 선택 가능한 전체 태그 목록
const allTags = ['Python', 'JS', 'Java', 'React', 'Django', '크롬확장프로그램', '사이드프로젝트', '알고리즘', '취업준비']

const ProfileEditForm = () => {
  const [nickname, setNickname] = useState('')
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [bio, setBio] = useState('')
  const [region, setRegion] = useState('')
  const [github, setGithub] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(['Python', 'JS'])
  const navigate = useNavigate()

  const isSaveEnabled = nickname !== '' && isNicknameChecked

  // 태그 클릭시 선택/해제
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="flex flex-col px-4 py-6 gap-4 bg-background">

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-1 text-base text-gray-700"
      >
        ← 뒤로가기
      </button>

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
              setIsNicknameChecked(false)
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

      {/* 관심 분야 태그 - 클릭으로 선택/해제 */}
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium text-gray-900">관심 분야</label>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-sm px-3 py-1 rounded-full ${
                selectedTags.includes(tag)
                  ? 'bg-activation text-primary'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tag}
            </button>
          ))}
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