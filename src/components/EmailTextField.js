import React from 'react';
import { TextField } from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import { useWindowSize } from '../hooks/useWindowSize';
import PropTypes from 'prop-types';

const EmailTextField = (props) => {

    const Theme = HookTheme();
    const windowSize = useWindowSize();

    const handleEmailInput = event =>
    {
        
        //reset error on text input
        props.setError('');
        //email regex
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regex.test(event.target.value) && event.target.value.toString() !== '')
        {
            props.setIsInvalid(false);
            props.setEmail(event.target.value, false);
        }
        else{
            props.setIsInvalid(true);
            props.setEmail(event.target.value, true);
            props.setError('Enter valid email');
        }
    }

    return (
        <TextField 
            className={`${windowSize.width > 768? Theme.darkInput : Theme.darkInput_M } `}
            onChange={handleEmailInput}
            value={props.email}
            type="text"
            label="Email"
            placeholder="test@test.com"
            error={props.error !== ''? true : false}
            helperText={props.error !== ''? props.error : null}
        />
    );
}

EmailTextField.propTypes = {
    error: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setIsInvalid: PropTypes.func.isRequired,
}

export { EmailTextField };