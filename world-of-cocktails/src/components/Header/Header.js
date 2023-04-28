import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useContexts";

// import "./Header.css";

export const Header = () => {
    const { isAuthenticated, userEmail, setShowForm, showForm } = useAuthContext();

    return (
        <header id="templatemo_header">
            <div id="templatemo_site_title">
                I Love <span>Cocktails</span>
            </div>
            <nav className="templatemo_menu">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/catalog">All Cocktails</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/create" onClick={(e) => { e.stopPropagation(); if (!showForm) setShowForm(true) }}>Add Cocktail</Link>
                            </li>
                            <li className="user-email">{userEmail}</li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" onClick={(e) => { e.stopPropagation(); if (!showForm) setShowForm(true) }}>Login</Link>
                            </li>
                            <li>
                                <Link to="/register" onClick={(e) => { e.stopPropagation(); if (!showForm) setShowForm(true) }}>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};