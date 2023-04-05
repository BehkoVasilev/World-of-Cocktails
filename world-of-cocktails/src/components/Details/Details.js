import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import { cocktailServiceFactory } from "../../services/cocktailService";
// import styles from "./Details.module.css";

export const Details = () => {
    const { userId, token } = useContext(AuthContext);
    const [cocktail, setCocktail] = useState({});
    const { cocktailId } = useParams();
    const navigate = useNavigate();
    const cocktailService = useService(cocktailServiceFactory);

    useEffect(() => {
        cocktailService.getOne(cocktailId)
            .then((data) => setCocktail(data));
    }, [cocktailId]);

    const onDeleteClick = async () => {
        await cocktailService.deleteCocktail(cocktailId);
        
        navigate('/catalog');
    }

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
            {cocktail._ownerId === userId && (
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <button className="button" onClick={onDeleteClick}>Delete</button>
                </div>
            )}
        </section>
    );
};