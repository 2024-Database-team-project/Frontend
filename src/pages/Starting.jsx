import ajouIcon from '../assets/ajou_symbol.png';
import { useNavigate } from 'react-router-dom';

const Starting = () => {
    const navigate = useNavigate();

    return (
        <div className=" flex flex-col items-center justify-center bg-white text-gray-800 px-10  ">
            {/* Logo */}
            <img src={ajouIcon} alt="Logo" className="w-40 mb-10 mt-20" />
            <h1 className=" mb-20 ">어서오세요 아주대학교 기숙사 어플리케이션 입니다.</h1>
            {/* Login Button */}
            <button
                onClick={() => navigate('/login')}
                className="w-1/4 h-12 bg-gray-100 text-blue-600 rounded-lg font-bold text-base mb-2 hover:bg-gray-200"
            >
                로그인
            </button>
        </div>
    );
};

export default Starting;
