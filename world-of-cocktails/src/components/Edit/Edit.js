import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useService } from '../../hooks/useService';
import { cocktailServiceFactory } from '../../services/cocktailService';
import styles from '../Create/Create.module.css';

const EditFormKeys = {
    Name: 'name',
    Ingredients: 'ingredients',
    Preaparation: 'preparation',
    ImageUrl: 'imageUrl',
}

export const Edit = ({
    onEditCocktailSubmit
}) => {

    const { cocktailId } = useParams();
    const cocktailService = useService(cocktailServiceFactory);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        [EditFormKeys.Name]: '',
        [EditFormKeys.Ingredients]: '',
        [EditFormKeys.Preaparation]: '',
        [EditFormKeys.ImageUrl]: '',
    }, onEditCocktailSubmit);

    useEffect(() => {
        cocktailService.getOne(cocktailId)
            .then(res => 
                changeValues(res));
    }, [cocktailId])

    return (
        <section id="create-page" className={styles.createForm}>
            <form className="create" method="PUT" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Make a cocktail</h1>

                    <label htmlFor="co-name">Cocktail Name:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={EditFormKeys.Name}
                        placeholder="Enter cocktail name..."
                        value={values[EditFormKeys.Name] || ''}
                        onChange={changeHandler}
                    />

                    <label htmlFor="category">Needed Ingredients:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={EditFormKeys.Ingredients}
                        placeholder="Enter products here..."
                        value={values[EditFormKeys.Ingredients] || ''}
                        onChange={changeHandler}
                    />

                    <label htmlFor="summary">Preparation:</label>
                    <textarea
                        name={EditFormKeys.Preaparation}
                        className="inputField"
                        placeholder="Enter preparation method..."
                        value={values[EditFormKeys.Preaparation] || ''}
                        onChange={changeHandler}
                    ></textarea>

                    <label htmlFor="cocktail-img">Image:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={EditFormKeys.ImageUrl}
                        placeholder="http://..."
                        value={values[EditFormKeys.ImageUrl] || ''}
                        onChange={changeHandler}
                    />

                    <input className="btnSubmit" type="submit" value="Edit cocktail" />
                </div>
            </form>
        </section>
    );
};