import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as likeService from "../../services/likeService";

import styles from "./Catalog.module.css";

export const Catalog = ({ cocktails }) => {
    const [cocktailsWithLikes, setCocktailsWithLikes] = useState([]);

    useEffect(() => {
        const getLikesForCocktail = (cocktail) => {
            return likeService.getAll(cocktail._id);
        };

        Promise.all(cocktails.map(getLikesForCocktail))
            .then((likesData) => {
                const cocktailsWithLikes = cocktails.map((cocktail, index) => {
                    const likes = likesData[index];
                    const cocktailWithLikes = { ...cocktail, likes };
                    return cocktailWithLikes;
                });
                setCocktailsWithLikes(cocktailsWithLikes);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [cocktails]);

    return (
        <section className={styles["catalog-page"]}>
            <h1>All Cocktails</h1>
            {cocktailsWithLikes.map((x) => (
                <div className={styles["allCocktails"]} key={x._id}>
                    <div className={styles["allCocktails-info"]}>
                        <img src={x.imageUrl} alt={x.name} />
                        <h3>{x.name}</h3>
                        <span>{x.likes.length} Likes</span>
                        <Link
                            to={`/catalog/${x._id}`}
                            className={styles["details-button"]}
                            id="details-button"
                        >
                            Details
                        </Link>
                    </div>
                </div>
            ))}
            {cocktailsWithLikes.length === 0 && (
                <h3 className={styles["no-articles"]}>No articles yet</h3>
            )}
        </section>
    );
};