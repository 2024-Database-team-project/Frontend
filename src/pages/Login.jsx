import ajouIcon from '../assets/ajou_symbol.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Api from '../api/api';

function LoginPage() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const dummyUsers = [{ id: 'ajou123', password: 'password123', name: '이상민' }];

    const onChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        if (name === 'id') {
            setId(value);
        } else if (name === 'password') {
            setPassword(value);
        }

        setError(errorMessage);
    };
    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     if (id.trim() === '' || password.trim() === '') {
    //         setError('모든 필드를 채워주세요.');
    //         return;
    //     }

    //     setLoading(true);

    //     // 더미 데이터와 비교
    //     const user = dummyUsers.find((user) => user.id === id && user.password === password);

    //     setTimeout(() => {
    //         setLoading(false);
    //         if (user) {
    //             localStorage.setItem('userId', user.id);
    //             alert(`환영합니다, ${user.name}님!`);
    //             navigate('/home');
    //         } else {
    //             setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    //             alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    //         }
    //     }, 1000); // 로딩 효과를 위해 약간의 지연을 추가
    // };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate input fields
        if (id.trim() === '' || password.trim() === '') {
            setError('모든 필드를 채워주세요.');
            return;
        }

        setLoading(true);

        try {
            // 백엔드 로그인 API 호출
            const response = await Api.post('/dorm/login', {
                id,
                password,
            });

            if (response.data) {
                localStorage.setItem('userId', response.data.userId);
                navigate('/home');
            } else {
                setError(response.data.message || '로그인에 실패했습니다.');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || '로그인에 실패했습니다.');
            } else if (err.request) {
                setError('서버와 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
            } else {
                setError('로그인 중 예상치 못한 오류가 발생했습니다.');
            }
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
                            type={'password'}
                            name="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={onChange}
                            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 text-black"
                        />
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
