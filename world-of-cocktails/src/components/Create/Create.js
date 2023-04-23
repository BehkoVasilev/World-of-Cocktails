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
    const { showForm, setShowForm } = useContext(AuthContext);

    const { values, changeHandler, onSubmit, errors } = useForm({
        [CreateFormKeys.Name]: '',
        [CreateFormKeys.Ingredients]: '',
        [CreateFormKeys.Preaparation]: '',
        [CreateFormKeys.ImageUrl]: '',
    }, onCreateCocktailSubmit);

    const createFormRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (createFormRef.current && !createFormRef.current.contains(e.target)) {
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
        <section id="create-page" className={styles.createForm} ref={createFormRef}>
            <form className="create" method="POST" onSubmit={onSubmit} >
                <div className="container">
                    <h1>Make a cocktail</h1>

                    <label htmlFor="co-name">Cocktail Name:</label>
                    <input
                        type="text"
                        className='inputFields'
                        name={CreateFormKeys.Name}
                        placeholder="Enter cocktail name..."
                        value={values[CreateFormKeys.Name] || ''}
                        onChange={changeHandler}

                    />
                    {errors[CreateFormKeys.Name] && <span className="error" style={{ color: 'red', fontWeight: '900' }}>{errors[CreateFormKeys.Name]}</span>}

                    <label htmlFor="category">Needed Ingredients:</label>
                    <input
                        type="text"
                        className='inputFields'
                        name={CreateFormKeys.Ingredients}
                        placeholder="Enter products here..."
                        value={values[CreateFormKeys.Ingredients] || ''}
                        onChange={changeHandler}

                    />
                    {errors[CreateFormKeys.Ingredients] && <span style={{ color: 'red', fontWeight: '900' }}>{errors[CreateFormKeys.Ingredients]}</span>}

                    <label htmlFor="summary">Preparation:</label>
                    <textarea
                        name={CreateFormKeys.Preaparation}
                        className='inputFields'
                        placeholder="Enter preparation method..."
                        value={values[CreateFormKeys.Preaparation] || ''}
                        onChange={changeHandler}
                        style={{ resize: 'none' }}

                    ></textarea>
                    {errors[CreateFormKeys.Preaparation] && <span className="error" style={{ color: 'red', fontWeight: '900' }}>{errors[CreateFormKeys.Preaparation]}</span>}


                    <label htmlFor="cocktail-img">Image:</label>
                    <input
                        type="text"
                        className='inputField'
                        name={CreateFormKeys.ImageUrl}
                        placeholder="http://..."
                        value={values[CreateFormKeys.ImageUrl] || ''}
                        onChange={changeHandler}

                    />
                    {errors[CreateFormKeys.ImageUrl] && <span className="error" style={{ color: 'red', fontWeight: '900' }}>{errors[CreateFormKeys.ImageUrl]}</span>}


                    <input className="btnSubmit" type="submit" value="Add cocktail" />
                </div>
            </form>
        </section>
    );
};