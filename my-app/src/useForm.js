import { useState } from "react";

const useForm = (initialValues, callback) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error;
        switch (name) {
            case "name":
                error = value ? "" : "Name is required";
                break;
            case "email":
                error = value && /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email";
                break;
            case "suggestion":
                error = value ? "" : "Suggestion is required";
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: validate(name, value),
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Object.keys(values).reduce((acc, key) => {
            const error = validate(key, values[key]);
            if (error) {
                acc[key] = error;
            }
            return acc;
        }, {});
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            callback(values);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
