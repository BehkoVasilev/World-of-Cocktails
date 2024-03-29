import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useContexts";

export const Home = () => {
    const { showForm, setShowForm } = useAuthContext();
    return (
        <div id="templatemo_content">
            <h1 className="title">Share Your Favorite Cocktail</h1>
            <div className="hero">
                <img className="hero-image" src="images/mojito.jpg" alt="Cocktail Photo" />
            </div>

            <div className="text-area" align="justify">
                <p>
                    Treat yourself to a great experience. Want to whip up some quick and easy cocktails at home?
                    Try out simple recipes and discover your favorite tipple - from fruity fizz to classic cocktails.
                    Discover new and unforgettable sensations.
                </p>

                <p>
                    Share your favorite cocktails. Don't be afraid of shaking up your spirits and braving the world of mixology.
                    The ones with the most likes will be in the running for the grand prize.
                </p>

                <Link className="button" to="/register" onClick={(e) => { e.stopPropagation(); if (!showForm) setShowForm(true) }}>Register Now</Link>
            </div>
        </div>
    );
};