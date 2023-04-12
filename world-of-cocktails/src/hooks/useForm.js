import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const validationErrors = {};
        Object.entries(values).forEach(([key, value]) => {
            if (!value) {
                validationErrors[key] = `${key} is required`;
            }
        });
        return validationErrors;
    };

    const isValid = (validationErrors) => {
        return Object.keys(validationErrors).length === 0;
    };

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
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