import { useState } from "react";
import { RegisterFormKeys } from '../components/Register/Register';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const validationErrors = {};
        if (values.repassword && values.password !== values.repassword) {
            validationErrors[RegisterFormKeys.RePassword] = 'Passwords do not match';
        }
        Object.entries(values).forEach(([key, value]) => {
            if (!value) {
                validationErrors[key] = `The input field "${key.charAt(0).toUpperCase() + key.slice(1)}" is required!`;
            }
        });
        return validationErrors;
    };

    const isValid = (validationErrors) => {
        return Object.keys(validationErrors).length === 0;
    };

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);
        
        if (isValid(validationErrors)) {
            onSubmitHandler(values);
            setValues(initialValues);
        }
    }

    const changeValues = (newValues) => {
        //TODO: validate newValues shape to be like initialValues
        setValues(newValues);
    }
    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
        errors
    }
}