const ProfileEditForm = () => {
  return (
    <div className="flex flex-col px-4 py-6 gap-4">

      {/* 프로필 이미지 수정 */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="https://via.placeholder.com/96"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <button className="text-sm text-blue-500">이미지 변경</button>
      </div>

      {/* 닉네임 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">닉네임</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="닉네임 입력"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg">
            중복확인
          </button>
        </div>
      </div>

      {/* 소개 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">소개</label>
        <textarea
          placeholder="소개를 입력해주세요"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none h-24"
        />
      </div>

      {/* 선호 지역 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">내 지역</label>
        <input
          type="text"
          placeholder="지역 입력"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* GitHub */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">GitHub</label>
        <input
          type="text"
          placeholder="GitHub 아이디 입력"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* 관심 분야 태그 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">관심 분야</label>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Python</span>
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">JS</span>
        </div>
      </div>

      {/* 저장하기 버튼 */}
      <button className="mt-4 w-full py-2 bg-gray-300 text-white rounded-lg text-sm cursor-not-allowed">
        저장하기
      </button>

    </div>
  )
}

export default ProfileEditForm