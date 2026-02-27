import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import personIcon from '@/assets/base/icon-person.svg';
import profileIcon from '@/assets/base/icon-person.svg';
import notificationIcon from '@/assets/base/icon-Notification.svg';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {/* 딤드 배경 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 드로어 패널 */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-background z-50 lg:hidden flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 text-xl">←</button>
        </div>

        {/* 프로필 영역 */}
        <div className="flex flex-col items-center gap-3 px-6 py-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img src={personIcon} alt="프로필" className="w-12 h-12" />
          </div>

          {isLoggedIn ? (
            <>
              <p className="text-lg font-bold text-gray-900">파이썬 연금술사</p>
              <Link
                to="/study/create"
                onClick={onClose}
                className="w-full py-3 bg-primary text-background text-base font-medium rounded-lg text-center"
              >
                스터디 만들기
              </Link>
              {/* 프로필 / My 스터디 / 알림 아이콘 탭 */}
              <div className="flex justify-around w-full pt-2">
                <button className="flex flex-col items-center gap-1 text-xs text-gray-500">
                  <img src={profileIcon} alt="프로필" className="w-6 h-6" />
                  프로필
                </button>
                <button className="flex flex-col items-center gap-1 text-xs text-gray-500">
                  <img src={profileIcon} alt="My 스터디" className="w-6 h-6" />
                  My 스터디
                </button>
                <button className="relative flex flex-col items-center gap-1 text-xs text-gray-500">
                  <div className="relative">
                    <img src={notificationIcon} alt="알림" className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
                  </div>
                  알림
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-base text-gray-500 text-center">
                스터디를 만들어<br />사람들과 함께 공부할 수 있어요!
              </p>
              <Link
                to="/login"
                onClick={onClose}
                className="w-full py-3 bg-primary text-background text-base font-medium rounded-lg text-center"
              >
                시작하기
              </Link>
            </>
          )}
        </div>

        {/* 구분선 */}
        <div className="h-px bg-gray-100 mx-6 my-2" />

        {/* 네비게이션 링크 */}
        <nav className="flex flex-col px-6 gap-1">
          <Link
            to="/"
            onClick={onClose}
            className="py-3 text-base text-gray-700"
          >
            스터디인 홈
          </Link>
          <Link
            to="/?type=local"
            onClick={onClose}
            className="py-3 text-base text-gray-700"
          >
            내지역 스터디
          </Link>
          <Link
            to="/?type=online"
            onClick={onClose}
            className="py-3 text-base text-gray-700"
          >
            온라인 스터디
          </Link>
        </nav>

        {/* 로그아웃 (로그인 상태일 때만) */}
        {isLoggedIn && (
          <>
            <div className="h-px bg-gray-100 mx-6 my-2" />
            <button className="px-6 py-3 text-base text-gray-700 text-left">
              로그아웃
            </button>
          </>
        )}
      </div>
    </>
  );
}
