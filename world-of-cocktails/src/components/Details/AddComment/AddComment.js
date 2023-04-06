import { useForm } from "../../../hooks/useForm";

const AddCommentKeys = {
    Comment: 'comment',
}

export const AddComment = ({
    onCommentSubmit
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        [AddCommentKeys.Comment]: '',
    }, onCommentSubmit);

    return (
        <article className="create-comment">
            <label>Add comment:</label>
            <form onSubmit={onSubmit}>
                <textarea
                    name="comment"
                    placeholder="Comment...."
                    value={values[AddCommentKeys.Comment]}
                    onChange={changeHandler}
                ></textarea>
                <input className="btn submit" type="submit" value="Add comment" />
            </form>
        </article>
    )
}