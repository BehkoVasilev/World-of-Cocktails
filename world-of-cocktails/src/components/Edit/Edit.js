import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useService } from '../../hooks/useService';
import { cocktailServiceFactory } from '../../services/cocktailService';
import styles from '../Create/Create.module.css';
import { useCocktailContext } from '../../hooks/useContexts';

const EditFormKeys = {
    Name: 'name',
    Ingredients: 'ingredients',
    Preaparation: 'preparation',
    ImageUrl: 'imageUrl',
}

export const Edit = () => {

    const { cocktailId } = useParams();
    const cocktailService = useService(cocktailServiceFactory);
    const { onEditCocktailSubmit } = useCocktailContext();

    const { values, changeHandler, onSubmit, changeValues, errors } = useForm({
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
                    {errors[EditFormKeys.Name] &&
                        <span style={{ color: 'red', fontWeight: '900' }}>
                            {errors[EditFormKeys.Name]}
                        </span>}

                    <label htmlFor="category">Needed Ingredients:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={EditFormKeys.Ingredients}
                        placeholder="Enter products here..."
                        value={values[EditFormKeys.Ingredients] || ''}
                        onChange={changeHandler}
                    />
                    {errors[EditFormKeys.Ingredients] &&
                        <span style={{ color: 'red', fontWeight: '900' }}>
                            {errors[EditFormKeys.Ingredients]}
                        </span>}

                    <label htmlFor="summary">Preparation:</label>
                    <textarea
                        name={EditFormKeys.Preaparation}
                        className="inputField"
                        placeholder="Enter preparation method..."
                        value={values[EditFormKeys.Preaparation] || ''}
                        onChange={changeHandler}
                        style={{ resize: 'none' }}
                    ></textarea>
                    {errors[EditFormKeys.Preaparation] &&
                        <span style={{ color: 'red', fontWeight: '900' }}>
                            {errors[EditFormKeys.Preaparation]}
                        </span>}

                    <label htmlFor="cocktail-img">Image:</label>
                    <input
                        type="text"
                        className="inputField"
                        name={EditFormKeys.ImageUrl}
                        placeholder="http://..."
                        value={values[EditFormKeys.ImageUrl] || ''}
                        onChange={changeHandler}
                    />
                    {errors[EditFormKeys.ImageUrl] &&
                        <span style={{ color: 'red', fontWeight: '900' }}>
                            {errors[EditFormKeys.ImageUrl]}
                        </span>}

                    <input className="btnSubmit" type="submit" value="Edit cocktail" />
                </div>
            </form>
        </section>
    );
};