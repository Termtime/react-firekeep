import React from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';

const SubmitButton = (props) => {
    const windowSize = useWindowSize();
    const Theme = HookTheme();
    return (
        <Box className={`${Theme.block}`}>
            <Button
            type="submit"
            disabled={props.disabled} 
            className={`${windowSize.width > 768? Theme.loginButton : Theme.loginButton_M }`}
            classes= { { disabled:Theme.disabledBtn } }
            onClick={props.onClick}>{props.children}</Button>
        </Box>
    );
}

SubmitButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}

SubmitButton.defaultProps = {
    disabled: false
}

export { SubmitButton }