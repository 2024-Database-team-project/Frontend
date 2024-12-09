import { Outlet } from 'react-router-dom';

const NoLayout = () => {
    return (
        <div className="h-screen relative">
            <div className="w-full h-full flex flex-col mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default NoLayout;
