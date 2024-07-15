import { Link } from "react-router-dom";
import './error.css';

export const Error = () => {
    return (
        <div className="error-container">
            <h2>Hoppá!</h2>
            <p>Váratlan hiba történt!</p>
            <Link to='/'>Vissza</Link>
        </div>
    );
};