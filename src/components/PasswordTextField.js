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
        error={Boolean(props.passState.error)}
        helperText={props.passState.error}
        type="password"
        label={props.label}
        value={props.passState.pass}
        onChange={(event) => props.setPassState(event.target.value)}
        placeholder="password"/>
    );
}

PasswordTextField.propTypes = {
    passState: PropTypes.object.isRequired,
    setPassState: PropTypes.func.isRequired,
}
PasswordTextField.defaultProps = {
    label: '',
}
export { PasswordTextField };