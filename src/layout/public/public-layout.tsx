import { PublicHeader } from "../../components/public/header/public-header";
import { Outlet } from 'react-router-dom';
import './public-layout.css';

export const PublicLayout = () => {
    return (
        <div className='public-layout-container'>
            <PublicHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
}