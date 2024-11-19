import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 루트 경로 */}
                <Route index element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
