import { useForm } from '../../hooks/useForm';
import styles from './Create.module.css';

const CreateFormKeys = {
    Name: 'name',
    Ingredients: 'ingredients',
    Preaparation: 'preparation',
    ImageUrl: 'imageUrl',
}

export const Create = ({
    onCreateCocktailSubmit
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        [CreateFormKeys.Name]: '',
        [CreateFormKeys.Ingredients]: '',
        [CreateFormKeys.Preaparation]: '',
        [CreateFormKeys.ImageUrl]: '',
    }, onCreateCocktailSubmit);

    return (
        <section id="create-page" className={styles.createForm}>
            <form className="create" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Make a cocktail</h1>

                    <label htmlFor="co-name">Cocktail Name:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={CreateFormKeys.Name}
                        placeholder="Enter cocktail name..."
                        value={values[CreateFormKeys.Name] || ''}
                        onChange={changeHandler}
                    />

                    <label htmlFor="category">Needed Ingredients:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={CreateFormKeys.Ingredients}
                        placeholder="Enter products here..."
                        value={values[CreateFormKeys.Ingredients] || ''}
                        onChange={changeHandler}
                    />

                    <label htmlFor="summary">Preparation:</label>
                    <textarea
                        name={CreateFormKeys.Preaparation}
                        className="inputField"
                        placeholder="Enter preparation method..."
                        value={values[CreateFormKeys.Preaparation] || ''}
                        onChange={changeHandler}
                    ></textarea>

                    <label htmlFor="cocktail-img">Image:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={CreateFormKeys.ImageUrl}
                        placeholder="http://..."
                        value={values[CreateFormKeys.ImageUrl] || ''}
                        onChange={changeHandler}
                    />

                    <input className="btnSubmit" type="submit" value="Add cocktail" />
                </div>
            </form>
        </section>
    );
};