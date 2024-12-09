import DormNotice from '../components/board/DormNotice';
import SuggestionBoard from '../components/board/SuggestionBoard';

const Home = () => {
    return (
        <div className="flex h-screen">
            <div className="grid grid-cols-3 gap-8">
                {/* <MyPage /> */}
                <DormNotice isMainPage={true} />
                <SuggestionBoard isMainPage={true} />
            </div>
        </div>
    );
};

export default Home;
