import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Catalog.module.css";
import { cocktailServiceFactory } from "../../services/cocktailService";

library.add(faHeart);

export const Catalog = ({
    allCocktails
}) => {
    const [updatedCocktails, setUpdatedCocktails] = useState(
        allCocktails
    );
    const { token, userId } = useContext(AuthContext);
    const cocktailService = cocktailServiceFactory(token);

    const handleLike = async (cocktailId) => {
        if(!userId){
            return
        }
        
        const cocktail = updatedCocktails.find((c) => c._id === cocktailId);

        if(cocktail._ownerId === userId){
            return
        }
        
        
        if (!cocktail.likedUsers.includes(userId)) {
            const newCocktail = { ...cocktail, likes: cocktail.likes + 1, likedUsers: [...cocktail.likedUsers, userId] };
            
            //I lost a lot of time while reading the documentation:
            // "Update
            // This request requires authorization and content-type headers (see above). Only the owner of the resource can edit it."

            // try {    
            //     await cocktailService.updateOne(cocktailId, newCocktail);
            // } catch (error) {
            //     console.error('Error occurred while updating cocktail:', error);
            // }

            setUpdatedCocktails(
                updatedCocktails.map((c) => (c._id === cocktailId ? newCocktail : c))
            );
        }
    };
    return (
        <section className={styles["catalog-page"]}>
            <h1>All Cocktails</h1>
            {updatedCocktails.map((x) => (
                <div className={styles["allCocktails"]} key={x._id} >
                    <div className={styles["allCocktails-info"]}>
                        <img src={x.imageUrl} alt={x.name} />
                        <div className={styles["likes-container"]}>
                            <h3>{x.name}</h3>
                            <span>{x.likes || 0}</span>
                            <FontAwesomeIcon icon={faHeart} onClick={() => handleLike(x._id)} />
                        </div>
                        <Link
                            to={`/catalog/${x._id}`}
                            className={styles["details-button"]}
                            id="details-button"
                        >Details</Link>
                    </div>
                </div>
            ))}
            {updatedCocktails.length === 0 && (
                <h3 className={styles["no-articles"]}>No articles yet</h3>
            )}
        </section>
    );
};