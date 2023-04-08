import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import * as commentSetvice from "../../services/commentService";
import * as likeService from "../../services/likeService";
import { cocktailServiceFactory } from "../../services/cocktailService";

import { AddComment } from "./AddComment/AddComment";
import { AddLike } from "./AddLike/AddLike";

export const Details = ({
    onDeleteClick
}) => {
    const { userId, isAuthenticated, userEmail } = useContext(AuthContext);
    const [cocktail, setCocktail] = useState({
        likes: 0,
        likedUsers: []
    });
    const { cocktailId } = useParams();

    const cocktailService = useService(cocktailServiceFactory);

    useEffect(() => {
        Promise.all([
            cocktailService.getOne(cocktailId),
            commentSetvice.getAll(cocktailId),
            likeService.getAll(cocktailId),
        ])
            .then(([cocktailData, comments, likes]) =>
                setCocktail({
                    ...cocktailData,
                    comments,
                    likes: likes.length,
                    likedUsers: likes.map((like) => like._ownerId),
                })
            )
    }, [cocktailId]);

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
    };

    const handleLike = async () => {
        if (!userId) {
            return;
        }

        if (cocktail.likedUsers.includes(userId)) {
            return;
        }

        try {
            await likeService.create(cocktailId);

            const updatedCocktail = {
                ...cocktail,
                likes: cocktail.likes + 1,
                likedUsers: [...cocktail.likedUsers, userId],
            };

            setCocktail(updatedCocktail);
        } catch (error) {
            console.error("Error occurred while creating like:", error);
        }
    };

    const handleDeleteClick = async () => {
        await onDeleteClick(cocktailId);
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
                <span>{cocktail.likes || 0} Likes</span>
                {userId !== cocktail._ownerId && 
                !cocktail.likedUsers.includes(userId) &&
                isAuthenticated
                    &&
                    <AddLike handleLike={handleLike} cocktailId={cocktailId} />}
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
                    <button className="button" onClick={handleDeleteClick}>Delete</button>
                </div>
            )}

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};