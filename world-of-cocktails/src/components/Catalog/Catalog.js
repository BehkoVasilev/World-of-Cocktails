import { Link } from "react-router-dom";

import styles from "./Catalog.module.css";

export const Catalog = ({ cocktails }) => {

    return (
        <section className={styles["catalog-page"]}>
            <h1>All Cocktails</h1>
            {cocktails.map((x) => (
                <div className={styles["allCocktails"]} key={x._id}>
                    <div className={styles["allCocktails-info"]}>
                        <img src={x.imageUrl} alt={x.name} />
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
            {cocktails.length === 0 && (
                <h3 className={styles["no-articles"]}>No articles yet</h3>
            )}
        </section>
    );
};