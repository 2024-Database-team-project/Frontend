import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="max-w-md h-full flex flex-col mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
