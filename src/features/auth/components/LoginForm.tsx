import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/authValidators';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { login, isLoading, apiError } = useLogin();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid && !isLoading) {
            await login(email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[322px] flex flex-col gap-3">
        
            {/* 이메일 입력 영역 */}
            <div>
                <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
                className={`w-full max-w-[322px] border-b-2 py-3 text-base placeholder:text-gray-500 focus:outline-none transition-colors ${
                    emailError 
                    ? 'border-error' 
                    : 'border-gray-300 focus:border-primary'
                }`}
                />
                {emailError && <p className="text-error text-[13px] mt-[6px]">{emailError}</p>}
            </div>

            {/* 비밀번호 입력 영역 */}
            <div className="mb-2"> 
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

            {apiError && (
                <p className="text-error text-[13px] text-center mb-2">{apiError}</p>
            )}

            {/* 로그인 버튼 */}
            <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full max-w-[322px] font-bold text-lg py-4 rounded-lg transition-colors ${
                    isValid && !isLoading
                        ? 'bg-primary text-background hover:bg-primary-light cursor-pointer' 
                        : 'bg-gray-300 text-background cursor-not-allowed'
                }`}
            >
                {isLoading ? '로그인 중...' : '로그인'}
            </button>
        </form>
    );
}