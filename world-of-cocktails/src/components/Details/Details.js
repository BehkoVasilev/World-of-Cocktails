import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { cocktailServiceFactory } from "../../services/cocktailService";
// import styles from "./Details.module.css";

export const Details = () => {
    const { token } = useContext(AuthContext);
    const [cocktail, setCocktail] = useState({});
    const { cocktailId } = useParams();
    const cocktailService = cocktailServiceFactory(token);

    useEffect(() => {
        cocktailService.getOne(cocktailId)
            .then((data) => setCocktail(data));
    }, [cocktailId]);

    return (
        <section className="details-page">
            <div className="details-container">
                <img src={cocktail.imageUrl} alt={cocktail.name} />
                <div className="details-info">
                    <h2>{cocktail.name}</h2>
                    <h3>Ingredients:</h3>
                    <ul>
                        <li>{cocktail.ingredients}</li>
                    </ul>
                    <h3>Preparation:</h3>
                    <p>{cocktail.preparation}</p>
                </div>
            </div>
        </section>
    );
};