import { NavLink } from 'react-router-dom';
import './public-header.css';

export const PublicHeader = () => {
    return (
        <header className="public-header">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/login">
                            Bejelentkezés
                            <span className='underline'></span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/registration-chooser">
                            Regisztráció
                            <span className='underline'></span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}