import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    RePassword: 'repassword',
}

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.RePassword]: '',
    }, onRegisterSubmit)

    return (
        <div className={styles.registerForm}>
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

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name={RegisterFormKeys.Password}
                    className="registerField"
                    value={values[RegisterFormKeys.Password] || ''}
                    onChange={changeHandler}
                />

                <label htmlFor="password">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Repeat password"
                    name={RegisterFormKeys.RePassword}
                    className="registerField"
                    value={values[RegisterFormKeys.RePassword] || ''}
                    onChange={changeHandler}
                />

                <button>Register</button>
                <p className="field">
                    <span>You already have a profile click <Link to="/login">here</Link></span>
                </p>
            </form>
        </div>
    );
};