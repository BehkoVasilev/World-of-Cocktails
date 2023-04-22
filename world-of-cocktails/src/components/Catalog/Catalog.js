import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as likeService from "../../services/likeService";

import styles from "./Catalog.module.css";

export const Catalog = ({ cocktails }) => {
    const [cocktailsWithLikes, setCocktailsWithLikes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!cocktails) {
            return;
        }
        const getLikesForCocktail = (cocktail) => {
            return likeService.getAll(cocktail._id);
        }

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

    let filteredCocktails = [];

    if (cocktailsWithLikes.length === 0) {
        filteredCocktails = [];
    } else {
        filteredCocktails = cocktailsWithLikes.filter((cocktail) =>
            cocktail.name.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())
        );
    }

    return (
        <section className={styles["catalog-page"]}>
            <h1>All Cocktails</h1>
            <div className={styles["search-bar"]}>
                <input
                    type="text"
                    placeholder="Search cocktails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {filteredCocktails.length > 0 ? (
                filteredCocktails.map((x) => (
                    <div className={styles["allCocktails"]} key={x._id}>
                        <div className={styles["allCocktails-info"]}>
                            <img src={x.imageUrl} alt={x.name} />
                            <h3>{x.name}</h3>
                            <span>{x.likes ? x.likes.length : "0"} Likes</span>
                            <Link
                                to={`/catalog/${x._id}`}
                                className={styles["details-button"]}
                                style={{color: 'rgba(37, 32, 32, 0.808)'}}
                                id="details-button"
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <h3 className={styles["no-articles"]}>No articles yet</h3>
            )}
        </section>
    )
}