import React from 'react';
import { TextField } from '@material-ui/core';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';
import PropTypes from 'prop-types';

const PasswordTextField = (props) => {
    const windowSize = useWindowSize();
    const Theme = HookTheme();

    return (
        <TextField
        className={`${windowSize.width > 768?  Theme.darkInput : Theme.darkInput_M }`}
        error={props.error !== ''? true : false}
        helperText={props.error}
        type="password"
        label={props.label}
        value={props.pass}
        onChange={(e) => props.setPass(e.target.value)}
        placeholder="password"/>
    );
}

PasswordTextField.propTypes = {
    pass: PropTypes.string.isRequired,
    setPass: PropTypes.func.isRequired,
    error: PropTypes.string
}
PasswordTextField.defaultProps = {
    label: '',
    error: ''
}
export { PasswordTextField };