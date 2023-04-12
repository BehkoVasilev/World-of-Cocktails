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

    const authService = authServiceFactory(auth.accessToken);
    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
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
            console.log(error.error.message);
        }
    };

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        showForm,
        setShowForm,
    };

    return (

        <>
            <AuthContext.Provider value={context}>
                {children}
            </AuthContext.Provider>
        </>
    )
};