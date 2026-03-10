import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginIllustration from '@/assets/login-illustration.png';
import LoginForm from '@/features/auth/components/LoginForm';
import githubLogo from '@/assets/base/Logo-github.svg';

export default function Login() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 py-12">

            <h2 className="text-2xl font-bold text-gray-900 text-left leading-[1.6] mt-[52px] mb-5">
                SNS계정으로 간편하게<br />
                회원가입/로그인 하세요! :)
            </h2>

            <img
                src={loginIllustration}
                alt="로그인 사자 일러스트"
                className="w-full max-w-[322px] h-auto rounded-3 object-contain mb-6"
            />

            <LoginForm />

            <div className="flex items-center gap-2 mt-6 text-sm text-gray-700">
                <Link to="/register" className="hover:text-primary-light transition-colors">회원가입</Link>
                <span className="w-[1px] h-3 bg-gray-700"></span>
                <Link to="/forgot-password" className="hover:text-primary-light transition-colors">비밀번호 찾기</Link>
            </div>

            {/* SNS 로그인 */}
            <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-[322px]">
                {/* 구분선 + 텍스트 */}
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-[1px] bg-gray-300" />
                    <span className="text-sm text-gray-500 shrink-0">간편로그인</span>
                    <div className="flex-1 h-[1px] bg-gray-300" />
                </div>
                {/* GitHub 버튼 */}
                <button
                    onClick={() => setShowModal(true)}
                    className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                    <img src={githubLogo} alt="GitHub 로그인" className="w-6 h-6 invert" />
                </button>
            </div>

            {/* 구현 중 모달 */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-background rounded-[12px] px-8 py-6 flex flex-col items-center gap-4 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={githubLogo} alt="" className="w-10 h-10" />
                        <p className="text-base font-bold text-surface">GitHub 로그인</p>
                        <p className="text-sm text-gray-500 text-center">현재 구현 중인 기능입니다.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full h-[40px] bg-primary text-background rounded-[8px] text-sm font-medium"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}