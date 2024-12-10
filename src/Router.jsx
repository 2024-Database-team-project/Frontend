import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './components/mypage/Mypage';
import Login from './pages/Login';
import SuggestionBoard from './components/board/SuggestionBoard';
// import DormNotice from './components/board/DormNotice';
import DeliveryService from './components/alarm/DeliveryService';
import Starting from './pages/Starting';
import Layout from './components/layout';
import DormNotice from './components/board/DormNotice';
import Laundry from './components/alarm/Laundry';
import Penalty from './components/board/Penalty';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 루트 경로 */}

                <Route path="/" element={<Starting />}></Route>
                <Route path="/login" element={<Login />}></Route>

                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/mypage" element={<MyPage />}></Route>
                    <Route path="/suggestionboard" element={<SuggestionBoard />}></Route>
                    <Route path="/notice" element={<DormNotice />}></Route>
                    <Route path="/laundary" element={<Laundry />}></Route>
                    <Route path="/delivery" element={<DeliveryService />}></Route>
                    <Route path="/penalty" element={<Penalty />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
