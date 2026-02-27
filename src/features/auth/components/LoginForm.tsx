// src/features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/authValidators';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        
        if (value.length === 0) {
        setEmailError('');
        } else if (!validateEmail(value)) {
        setEmailError('이메일을 확인해 주세요.');
        } else {
        setEmailError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        
        if (value.length === 0) {
        setPasswordError('');
        } else if (!validatePassword(value)) {
        setPasswordError('비밀번호를 확인해 주세요.');
        } else {
        setPasswordError('');
        }
    };

    const isValid = validateEmail(email) && validatePassword(password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
        console.log('로그인 시도:', { email, password });
        }
    };

    return (
        // 💡 폼 전체 간격과 너비 설정 (기존 코드 반영)
        <form onSubmit={handleSubmit} className="w-full max-w-[322px] flex flex-col gap-3">
        
        {/* 이메일 입력 영역 */}
        <div>
            <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            // 💡 기존 스타일 유지 + 에러 상태에 따라 테두리 색상만 변경!
            className={`w-full max-w-[322px] border-b-2 py-3 text-base placeholder:text-gray-500 focus:outline-none transition-colors ${
                emailError 
                ? 'border-error' 
                : 'border-gray-300 focus:border-primary'
            }`}
            />
            {emailError && <p className="text-error text-[13px] mt-[6px]">{emailError}</p>}
        </div>

        {/* 비밀번호 입력 영역 */}
        <div className="mb-2"> {/* 💡 기존 input에 있던 mb-2를 에러메시지 공간 확보를 위해 wrapper로 이동 */}
            <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full max-w-[322px] border-b-2 py-3 text-base placeholder:text-gray-500 focus:outline-none transition-colors ${
                passwordError 
                ? 'border-error' 
                : 'border-gray-300 focus:border-primary'
            }`}
            />
            {passwordError && <p className="text-error text-[13px] mt-[6px]">{passwordError}</p>}
        </div>

        {/* 로그인 버튼 */}
        <button
            type="submit"
            disabled={!isValid}
            // 💡 기존 스타일(rounded-lg, py-4) 유지 + 활성/비활성 색상 분기 처리
            className={`w-full max-w-[322px] font-bold text-lg py-4 rounded-lg transition-colors ${
            isValid 
                ? 'bg-primary text-background hover:bg-primary-light cursor-pointer' 
                : 'bg-gray-300 text-background cursor-not-allowed'
            }`}
        >
            로그인
        </button>
        </form>
    );
}