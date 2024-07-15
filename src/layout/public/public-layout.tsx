import { PublicHeader } from "../../components/public/header/public-header";
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
    return (
        <div style={{ padding: '0 40px 40px 40px' }}>
            <PublicHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
}