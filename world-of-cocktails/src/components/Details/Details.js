import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import * as commentSetvice from "../../services/commentService";
import { cocktailServiceFactory } from "../../services/cocktailService";

import { AddComment } from "./AddComment/AddComment";
// import styles from "./Details.module.css";

export const Details = () => {
    const { userId, isAuthenticated, userEmail } = useContext(AuthContext);
    const [cocktail, setCocktail] = useState({});
    const { cocktailId } = useParams();

    const navigate = useNavigate();
    const cocktailService = useService(cocktailServiceFactory);

    useEffect(() => {
        Promise.all([
            cocktailService.getOne(cocktailId),
            commentSetvice.getAll(cocktailId)
        ]).then(([cocktailData, comments]) =>
            setCocktail({
                ...cocktailData,
                comments
            }));
    }, [cocktailId, cocktailService]);

    const onDeleteClick = async () => {
        await cocktailService.deleteCocktail(cocktailId);
        // update state
        navigate('/catalog');
    }

    const onCommentSubmit = async (values) => {
        const newComment = await commentSetvice.create(cocktailId, values.comment);

        setCocktail(state => ({
            ...state,
            comments: [
                ...state.comments,
                {
                    ...newComment,
                    author: {
                        email: userEmail
                    },
                }
            ],
        }))
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
            
            <div className="comments">
                <h2>Comments:</h2>
                <ul>
                    {cocktail.comments && cocktail.comments.map(x => (
                        <li key={x._id} className="comment">
                            <p>{x.author.email}: {x.comment}</p>
                        </li>
                    ))}
                </ul>
                {!cocktail.comments?.length && (
                    <p className="no-comments">No comments</p>
                )}
            </div>
            {cocktail._ownerId === userId && (
                <div className="buttons">
                    <Link to={`/catalog/${cocktailId}/edit`} className="button">Edit</Link>
                    <button className="button" onClick={onDeleteClick}>Delete</button>
                </div>
            )}

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};