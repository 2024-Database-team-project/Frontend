import ajouIcon from '../assets/ajou_symbol.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPW, setShowPW] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPW(!showPW);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        if (name === 'id') {
            setId(value);
        } else if (name === 'password') {
            setPassword(value);

            if (value.length < 6) {
                errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
            }
        }

        setError(errorMessage);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLoading || id === '' || password === '') {
            setError('모든 필드를 채워주세요.');
            return;
        }

        setLoading(true);

        try {
            // 백엔드 로그인 API 호출
            const response = await axios.post('https://your-api-url.com/login', {
                id,
                password,
            });

            // 로그인 성공 시 처리
            if (response.status === 200) {
                // 예: 토큰 저장
                const { token } = response.data;
                localStorage.setItem('authToken', token);

                // 홈 페이지로 이동
                navigate('/');
            }
        } catch (err) {
            // 로그인 실패 시 에러 메시지 처리
            setError(err.response?.data?.message || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-lg p-6">
                <div className=" flex flex-col items-center justify-center bg-white text-gray-800 px-10">
                    <img src={ajouIcon} alt="Logo" className="w-40 mb-10 mt-20" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="email">
                        아이디
                    </label>
                    <input
                        type="id"
                        name="id"
                        placeholder="ajou123"
                        value={id}
                        onChange={onChange}
                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-700" htmlFor="password">
                        비밀번호
                    </label>
                    <div className="relative">
                        <input
                            type={showPW ? 'text' : 'password'}
                            name="password"
                            placeholder="비밀번호를 입력해주세요 (6자리 이상)"
                            value={password}
                            onChange={onChange}
                            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 text-black"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {showPW ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 mt-6 text-white font-bold rounded-md ${
                        isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isLoading ? '로딩중...' : '로그인'}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
