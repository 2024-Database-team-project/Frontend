import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // localStorage에서 토큰 제거
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // 로그아웃 후 메인 페이지로 이동
        navigate('/');
    };
    return (
        <div className="w-64 bg-gray-100 h-full flex flex-col p-4 text-center">
            <h1 className="text-xl font-bold mb-6">Dormify</h1>
            <ul className="flex flex-col  gap-4">
                <li className="text-gray-700 font-medium" onClick={() => navigate('/home')}>
                    메인 화면
                </li>
                <li className="text-gray-700 font-medium" onClick={() => navigate('/mypage')}>
                    내 정보
                </li>
                <li className="text-gray-700 font-medium" onClick={() => navigate('/')}>
                    벌점 확인
                </li>
                <li className="text-gray-700 font-medium" onClick={() => navigate('/')}>
                    기숙사 접수
                </li>
                <li className="text-gray-700 font-medium" onClick={() => navigate('/notice')}>
                    공지사항
                </li>
                <li className="text-gray-700 font-medium" onClick={() => navigate('/suggestionboard')}>
                    건의사항
                </li>
                <li className="text-gray-700 font-medium" onClick={() => navigate('/')}>
                    택배/세탁 서비스
                </li>
            </ul>
            <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded" onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    );
};

export default Sidebar;
