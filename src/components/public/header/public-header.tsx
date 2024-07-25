import { Link, useLocation } from 'react-router-dom';
import './public-header.css';
import { useEffect, useState } from 'react';

export const PublicHeader = () => {
    const location = useLocation();
    const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

    useEffect(() => {

        if([
            '/registration-chooser',
            '/company-registration-one',
            '/company-registration-two',
            '/company-registration-three'
        ].includes(location.pathname)) {
            setActiveNavItem('registration');
        } else if (location.pathname === '/login') {
            setActiveNavItem('login');
        } else {
            setActiveNavItem(null);
        }

    }, [location.pathname]);

    return (
        <header className="public-header">
            <nav>
                <ul>
                    <li>
                        <Link to="/login" className={activeNavItem === 'login' ? 'active' : ''}>
                            Bejelentkezés
                            <span className='underline'></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/registration-chooser" className={activeNavItem === 'registration' ? 'active' : ''}>
                            Regisztráció
                            <span className='underline'></span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}