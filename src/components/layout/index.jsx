import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="w-full flex h-screen">
            <Sidebar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
