const ActivityTabs = () => {
  return (
    <div className="flex flex-col px-4 py-4 gap-4">

      {/* 탭 버튼 */}
      <div className="flex border-b border-gray-200">
        <button className="flex-1 py-2 text-sm font-semibold text-blue-500 border-b-2 border-blue-500">
          참여한 스터디
        </button>
        <button className="flex-1 py-2 text-sm text-gray-400">
          관심 스터디
        </button>
      </div>

      {/* 스터디 목록 */}
      <div className="flex flex-col gap-3">
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-sm font-semibold">스터디 이름</p>
          <p className="text-xs text-gray-400">2024.01.01 ~ 2024.03.01</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <p className="text-sm font-semibold">스터디 이름</p>
          <p className="text-xs text-gray-400">2024.01.01 ~ 2024.03.01</p>
        </div>
      </div>

    </div>
  )
}

export default ActivityTabs