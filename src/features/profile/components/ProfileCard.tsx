const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center px-4 py-6 gap-4">
      
      {/* 프로필 이미지 */}
      <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
        <img
          src="https://via.placeholder.com/96"
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 닉네임 */}
      <h2 className="text-lg font-bold">파이썬 연금술사</h2>

      {/* 소개글 */}
      <p className="text-sm text-gray-500 text-center bg-gray-100 rounded-lg px-4 py-3">
        나는야 파이썬을 아주 잘하는 파이썬 보안관!
      </p>

      {/* 정보 목록 */}
      <div className="w-full flex flex-col gap-3 mt-2">
        <div className="flex gap-4">
          <span className="font-semibold text-sm w-24">이메일(ID)</span>
          <span className="text-sm text-gray-600">paul-lab@naver.com</span>
        </div>
        <div className="flex gap-4">
          <span className="font-semibold text-sm w-24">이름</span>
          <span className="text-sm text-gray-600">홍길동</span>
        </div>
        <div className="flex gap-4">
          <span className="font-semibold text-sm w-24">전화번호</span>
          <span className="text-sm text-gray-600">010-8888-9999</span>
        </div>
        <div className="flex gap-4">
          <span className="font-semibold text-sm w-24">내 지역</span>
          <span className="text-sm text-gray-600">제주특별자치도 제주시 애월읍</span>
        </div>
        <div className="flex gap-4">
          <span className="font-semibold text-sm w-24">GitHub</span>
          <span className="text-sm text-gray-600">dkdkdkdk</span>
        </div>
      </div>

      {/* 관심 분야 태그 */}
      <div className="w-full">
        <p className="text-sm font-semibold mb-2">관심 분야</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Python</span>
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">크롬확장프로그램</span>
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">사이드프로젝트</span>
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">JS</span>
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Django</span>
        </div>
      </div>

      {/* 수정하기 버튼 */}
      <button className="mt-4 w-40 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
        수정하기
      </button>

    </div>
  );
};

export default ProfileCard;