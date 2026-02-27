import { Link } from 'react-router-dom';
import loginIllustration from '@/assets/login-illustration.png';

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4 py-12">

            <h2 className="text-2xl font-bold text-gray-900 text-left leading-[1.6] mt-[25px] mb-5">
                SNS계정으로 간편하게<br />
                회원가입/로그인 하세요! :)
            </h2>

            <img 
                src={loginIllustration} 
                alt="로그인 사자 일러스트" 
                className="w-full max-w-[322px] h-auto rounded-3 object-contain mb-6"
            />

            <form className="w-full max-w-[322px] flex flex-col gap-3">
                
                <input 
                    type="email" 
                    placeholder="이메일" 
                    className="w-full max-w-[322px] border-b-2 border-gray-300 py-3 text-base placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
                
                <input 
                    type="password" 
                    placeholder="비밀번호" 
                    className="w-full max-w-[322px] border-b-2 border-gray-300 py-3 text-base placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors mb-2"
                />

                <button 
                    type="button" 
                    className="w-full max-w-[322px] bg-primary text-background font-bold text-lg py-4 rounded-lg hover:bg-primary-light transition-colors"
                >
                    로그인
                </button>
            </form>

            <div className="flex items-center gap-2 mt-6 text-sm text-gray-700">
                <Link to="/register" className="hover:text-primary-light transition-colors">회원가입</Link>
                <span className="w-[1px] h-3 bg-gray-700"></span> {/* 구분선(|) */}
                <Link to="/forgot-password" className="hover:text-primary-light transition-colors">비밀번호 찾기</Link>
            </div>

        </div>
    );
}