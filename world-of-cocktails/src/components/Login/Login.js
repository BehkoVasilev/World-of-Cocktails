import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
}

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);

    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    return (
        <div className={styles.loginForm}>
            <form method='POST' onSubmit={onSubmit}>
                <h3>Login</h3>

                <label htmlFor="username">Email</label>
                <input
                    type="text"
                    placeholder="Email..."
                    name={LoginFormKeys.Email}
                    className="loginField"
                    value={values[LoginFormKeys.Email] || ''}
                    onChange={changeHandler}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password..."
                    name={LoginFormKeys.Password}
                    className="loginField"
                    value={values[LoginFormKeys.Password] || ''}
                    onChange={changeHandler}
                />

                <button>Log In</button>
                <p className="field">
                    <span>If you don't have profile click <Link to="/register">here</Link></span>
                </p>
            </form>
        </div>
    );
};