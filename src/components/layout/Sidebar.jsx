import { useNavigate } from 'react-router-dom';
import ajouIcon from '../../assets/ajou_symbol.png';
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
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 flex flex-col p-4 text-center justify-center items-center shadow-md">
            <img src={ajouIcon} alt="Logo" className="w-40 mb-10 mt-20" />
            <h1 className="text-xl font-bold mb-6">Dormify</h1>
            <ul className="flex flex-col gap-4">
                <li className="text-gray-700 font-medium cursor-pointer" onClick={() => navigate('/home')}>
                    메인 화면
                </li>
                <li className="text-gray-700 font-medium cursor-pointer" onClick={() => navigate('/mypage')}>
                    내 정보
                </li>
                <li className="text-gray-700 font-medium cursor-pointer" onClick={() => navigate('/penalty')}>
                    기숙사 규정
                </li>
                <li className="text-gray-700 font-medium cursor-pointer" onClick={() => navigate('/notice')}>
                    공지사항
                </li>
                <li className="text-gray-700 font-medium cursor-pointer" onClick={() => navigate('/suggestionboard')}>
                    건의사항
                </li>
                <li className="text-gray-700 font-medium cursor-pointer" onClick={() => navigate('/laundary')}>
                    세탁 알림
                </li>
            </ul>
            <button
                className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={handleLogout}
            >
                로그아웃
            </button>
        </div>
    );
};

export default Sidebar;
