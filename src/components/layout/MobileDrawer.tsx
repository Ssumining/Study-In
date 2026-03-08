import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { getNotifications } from "@/api/notification";
import { storage } from "@/utils/storage";
import PersonIcon from "@/assets/base/icon-person.svg?react";
import NotificationIcon from "@/assets/base/icon-Notification.svg?react";
import LeftArrowIcon from "@/assets/base/icon-Left-arrow.svg?react";
import defaultProfileSrc from "@/assets/base/Ellipse 46.svg";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchUnread = async () => {
      try {
        const data = await getNotifications();
        setUnreadCount(data.results.filter((n) => !n.checked).length);
      } catch {
        // 에러 무시
      }
    };
    fetchUnread();
  }, [isLoggedIn]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[290px] bg-background z-50 lg:hidden flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 상단 24px 흰색 여백 */}
        <div className="h-6 flex-shrink-0" />

        {/* 프로필 영역 (닫기 버튼 포함) */}
        <div className="bg-gray-100 border-b border-gray-300 px-[45px] pt-[40px] pb-[36px] flex flex-col items-center gap-[28px] relative">
          <button
            onClick={onClose}
            className="absolute top-[10px] right-[10px] w-7 h-7 flex items-center justify-center"
          >
            <LeftArrowIcon className="w-6 h-6 text-gray-500" />
          </button>

          {/* 아바타 */}
          <div className="w-[100px] h-[100px] rounded-full border border-gray-300 overflow-hidden">
            <img src={defaultProfileSrc} alt="" className="w-full h-full object-cover" />
          </div>

          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-3 w-full">
              <p className="text-base font-bold text-surface text-center">
                파이썬 연금술사
              </p>
              <Link
                to="/study/create"
                onClick={onClose}
                className="w-[200px] h-[40px] bg-primary text-background text-sm font-medium rounded-lg flex items-center justify-center"
              >
                스터디 만들기
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 w-full">
              <p className="text-sm text-gray-700 text-center leading-[20px]">
                스터디를 만들어
                <br />
                사람들과 함께 공부할 수 있어요!
              </p>
              <Link
                to="/login"
                onClick={onClose}
                className="w-[200px] h-[40px] bg-primary text-background text-sm font-medium rounded-lg flex items-center justify-center"
              >
                시작하기
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex justify-around w-[200px]">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex flex-col items-center gap-1"
              >
                <PersonIcon className="w-[30px] h-[30px] text-surface" />
                <span className="text-xs text-gray-700">프로필</span>
              </Link>
              <Link
                to="/my-study"
                onClick={onClose}
                className="flex flex-col items-center gap-1"
              >
                <PersonIcon className="w-[30px] h-[30px] text-surface" />
                <span className="text-xs text-gray-700">My 스터디</span>
              </Link>
              <Link
                to="/notification"
                onClick={onClose}
                className="flex flex-col items-center gap-1"
              >
                <div className="relative w-[30px] h-[30px]">
                  <NotificationIcon className="w-[30px] h-[30px] text-surface" />
                  {unreadCount > 0 && (
                    <span className="absolute bottom-0.5 right-0 w-[10px] h-[10px] bg-error rounded-full" />
                  )}
                </div>
                <span className="text-xs text-gray-700">알림</span>
              </Link>
            </div>
          )}
        </div>

        {/* 네비게이션 */}
        <nav className="flex flex-col pt-[5px]">
          <Link
            to="/"
            onClick={onClose}
            className="px-[30px] py-[15px] text-sm text-surface"
          >
            스터디인 홈
          </Link>
          <Link
            to="/?type=local"
            onClick={onClose}
            className="px-[30px] py-[15px] text-sm text-surface"
          >
            내지역 스터디
          </Link>
          <Link
            to="/?type=online"
            onClick={onClose}
            className="px-[30px] py-[15px] text-sm text-surface"
          >
            온라인 스터디
          </Link>
        </nav>

        {/* 구분선 + 로그아웃 */}
        <div className="h-[6px] bg-gray-100" />
        {isLoggedIn && (
          <button
            onClick={() => {
              storage.clearAuth();
              logout();
              onClose();
              navigate('/login');
            }}
            className="px-[30px] py-[15px] text-sm text-surface text-left"
          >
            로그아웃
          </button>
        )}
      </div>
    </>
  );
}
