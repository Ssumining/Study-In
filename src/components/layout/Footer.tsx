import logoSrc from '@/assets/base/icon-Logo.svg';
import { useAuthStore } from '@/store/authStore';

// 소셜 아이콘 — 추후 실제 아이콘 이미지로 교체
const SOCIAL_LINKS = [
  { label: 'SNS 1', href: '#' },
  { label: 'SNS 2', href: '#' },
  { label: 'SNS 3', href: '#' },
  { label: 'SNS 4', href: '#' },
  { label: 'SNS 5', href: '#' },
];

const POLICY_LINKS = [
  { label: '이용약관', href: '/terms' },
  { label: '위치기반서비스이용약관', href: '/location-terms' },
  { label: '개인정보 처리방침', href: '/privacy' },
];

export default function Footer() {
  const { isLoggedIn } = useAuthStore();

  // 로그인 상태 — 심플 푸터
  if (isLoggedIn) {
    return (
      <footer className="py-8 border-t border-gray-100">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            {POLICY_LINKS.map(({ label, href }, i) => (
              <span key={label} className="flex items-center gap-4">
                <a href={href} className="text-sm text-gray-500 hover:text-gray-700">{label}</a>
                {i < POLICY_LINKS.length - 1 && <span className="text-gray-300">|</span>}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-300">ⓒ Copyright WENIV Corp. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }

  // 비로그인 상태 — 풀 푸터
  return (
    <footer className="min-h-[334px] py-10 border-t border-gray-100">
      <div className="max-w-[990px] mx-auto px-4">

        {/* 상단: 링크 컬럼 + 소셜 아이콘 */}
        <div className="flex justify-between items-start mb-10">

          {/* 링크 컬럼 3개 */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-700">위니브</p>
              <a href="https://weniv.co.kr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700">회사 소개 ↗</a>
              <a href="https://jejucodingcamp.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-700">제주코딩베이스캠프 ↗</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-700">위니브월드</p>
              <a href="/guide" className="text-sm text-gray-500 hover:text-gray-700">위니브월드 이용 가이드</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-gray-700">정책</p>
              {POLICY_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="text-sm text-gray-500 hover:text-gray-700">{label}</a>
              ))}
            </div>
          </div>

          {/* 소셜 아이콘 */}
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a key={label} href={href} aria-label={label}
                className="w-10 h-10 rounded-xl border border-gray-300 bg-background" />
            ))}
          </div>
        </div>

        {/* 하단: 로고 + 사업자 정보 */}
        <div className="flex justify-between items-end border-t border-gray-100 pt-6">
          <div className="flex flex-col gap-2">
            <img src={logoSrc} alt="Studyin" className="h-4" />
            <p className="text-xs text-gray-300">
              (주)위니브 | 대표 이호준 | 사업자 번호 546-86-01737 | 정보통신산업 | 주소 제주특별자치도 제주시 수목원일
            </p>
          </div>
          <p className="text-xs text-gray-300">ⓒ WENIV Corp.</p>
        </div>
      </div>
    </footer>
  );
}
