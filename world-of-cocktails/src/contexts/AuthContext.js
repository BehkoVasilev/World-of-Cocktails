import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const [showForm, setShowForm] = useState(true);
    const [authError, setAuthError] = useState({});

    const authService = authServiceFactory(auth.accessToken);
    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);
            navigate('/')
        } catch (error) {
            setAuthError({ login: error });
        }
    };

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
        setAuthError({})
        localStorage.clear();
    }

    const onRegisterSubmit = async (data) => {
        const { repassword, ...registerData } = data;

        if (repassword !== registerData.password) {
            return
        }

        try {
            const result = await authService.register(registerData);

            setAuth(result);

            navigate('/')
        } catch (error) {
            setAuthError({ register: error });
        }
    };

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken || '',
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        showForm,
        setShowForm,
        authError,
        setAuthError
    };

    return (

        <>
            <AuthContext.Provider value={context}>
                {children}
            </AuthContext.Provider>
        </>
    )
};