import DormNotice from '../components/board/DormNotice';
import SuggestionBoard from '../components/board/SuggestionBoard';
import MyPage from '../components/mypage/Mypage';

const Home = () => {
    return (
        <div className="flex h-screen bg-gray-50 p-4">
            {/* 왼쪽: 내 정보 */}
            <div className="w-2/3 p-4 bg-white rounded-lg shadow-md flex flex-col ">
                <h2 className="text-lg font-bold mb-4">내 정보</h2>
                <div className="overflow-y-auto flex-grow">
                    <MyPage />
                </div>
            </div>

            {/* 가운데: 공지사항 */}
            <div className="w-1/3 mx-4 p-4 bg-white rounded-lg shadow-md flex flex-col">
                <h2 className="text-lg font-bold mb-4">공지사항</h2>
                <div className="overflow-y-auto flex-grow">
                    <DormNotice isMainPage={true} />
                </div>
            </div>

            {/* 오른쪽: 건의사항 */}
            <div className="w-1/3 p-4 bg-white rounded-lg shadow-md flex flex-col">
                <h2 className="text-lg font-bold mb-4">건의사항</h2>
                <div className="overflow-y-auto flex-grow">
                    <SuggestionBoard isMainPage={true} />
                </div>
            </div>
        </div>
    );
};

export default Home;
