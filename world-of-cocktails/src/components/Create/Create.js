import { useEffect } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
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
    const {showForm, setShowForm} = useContext(AuthContext);

    const { values, changeHandler, onSubmit } = useForm({
        [CreateFormKeys.Name]: '',
        [CreateFormKeys.Ingredients]: '',
        [CreateFormKeys.Preaparation]: '',
        [CreateFormKeys.ImageUrl]: '',
    }, onCreateCocktailSubmit);

    const createFormRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(createFormRef.current && !createFormRef.current.contains(e.target)){
                setShowForm(!showForm);
                navigate('/');
            };
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    })

    return (
        <section id="create-page" className={styles.createForm}>
            <form className="create" method="POST" onSubmit={onSubmit} ref={createFormRef}>
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