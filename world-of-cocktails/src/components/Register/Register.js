import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

export const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    RePassword: 'repassword',
}

export const Register = () => {
    const { onRegisterSubmit, showForm, setShowForm } = useContext(AuthContext);

    const { values, changeHandler, onSubmit, errors } = useForm({
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.RePassword]: '',
    }, onRegisterSubmit)

    const registerFormRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (registerFormRef.current && !registerFormRef.current.contains(e.target)) {
                setShowForm(!showForm);
                navigate('/');
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [registerFormRef])

    return (
        <div className={styles.registerForm} ref={registerFormRef}>
            <form method="POST" onSubmit={onSubmit}>
                <h3>Register Here</h3>

                <label htmlFor="username">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    name={RegisterFormKeys.Email}
                    className="registerField"
                    value={values[RegisterFormKeys.Email] || ''}
                    onChange={changeHandler}
                />
                {errors[RegisterFormKeys.Email] && <span style={{color: 'red', fontWeight: '900'}}>{errors[RegisterFormKeys.Email]}</span>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name={RegisterFormKeys.Password}
                    className="registerField"
                    value={values[RegisterFormKeys.Password] || ''}
                    onChange={changeHandler}
                />
                {errors[RegisterFormKeys.Password] && <span style={{color: 'red', fontWeight: '900'}}>{errors[RegisterFormKeys.Password]}</span>}


                <label htmlFor="password">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Repeat password"
                    name={RegisterFormKeys.RePassword}
                    className="registerField"
                    value={values[RegisterFormKeys.RePassword] || ''}
                    onChange={changeHandler}
                />
                {errors[RegisterFormKeys.RePassword] && <span style={{color: 'red', fontWeight: '900'}}>{errors[RegisterFormKeys.RePassword]}</span>}


                <button>Register</button>
                <div className="field">
                    <p >
                        You already have a profile click <Link to='/login' onClick={(e) => { e.stopPropagation(); if (!showForm) setShowForm(true) }}>here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};