import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

import { useForm } from '../../hooks/useForm';
import { useAuthContext } from '../../hooks/useContexts';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};

export const Login = () => {
    const { onLoginSubmit, showForm, setShowForm, authError, setAuthError } = useAuthContext();
    
    const navigate = useNavigate();

    const { values, changeHandler, onSubmit, errors } = useForm({
            [LoginFormKeys.Email]: '',
            [LoginFormKeys.Password]: '',
        },onLoginSubmit
    );

    const loginFormRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
                setShowForm(!showForm);
                setAuthError({});
                navigate('/');
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [loginFormRef]);

    return (
        <div className={styles.loginForm} ref={loginFormRef}>
            {showForm && (
                <form method='POST' onSubmit={onSubmit}>
                    <h3>Login</h3>
                    {authError.login && <span style={{color: 'red', fontWeight: '900'}}>{authError.login}</span>}
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        placeholder="admin@abv.bg"
                        name={LoginFormKeys.Email}
                        className="loginField"
                        value={values[LoginFormKeys.Email] || ''}
                        onChange={changeHandler}
                    />
                    {errors[LoginFormKeys.Email] && <span style={{ color: 'red', fontWeight: '900' }}>{errors[LoginFormKeys.Email]}</span>}

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password..."
                        name={LoginFormKeys.Password}
                        className="loginField"
                        value={values[LoginFormKeys.Password] || ''}
                        onChange={changeHandler}
                    />
                    {errors[LoginFormKeys.Password] && <span style={{ color: 'red', fontWeight: '900' }}>{errors[LoginFormKeys.Password]}</span>}

                    <button>Log In</button>
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register" onClick={(e) => { e.stopPropagation(); if (!showForm) setShowForm(true) }}>here</Link></span>
                    </p>
                </form>
            )}
        </div>
    );
};