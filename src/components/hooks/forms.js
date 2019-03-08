import { useState } from 'react';

export const useFormInput = () => {
    const [value ,setvalue] = useState('');
    const [validity, setValidity] = useState(false);

    const inputChangeHandler = (evt) => {
        setvalue(evt.target.value);
        console.log('useforminput inputChangeHandler');
        if(evt.target.value.trim() === '') {
            setValidity(false);
        } else {
            setValidity(true);
        }
    }

    return {
        value: value,
        onChange: inputChangeHandler,
        validity: validity
    };
};