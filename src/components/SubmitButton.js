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
            variant="contained" 
            color="primary"
            type="submit"
            disabled={props.disabled} 
            classes= { { root: windowSize.width > 768? Theme.loginButton : Theme.loginButton_M , disabled:Theme.disabledBtn } }>{props.children}</Button>
        </Box>
    );
}

SubmitButton.propTypes = {
    disabled: PropTypes.bool,
}

SubmitButton.defaultProps = {
    disabled: false
}

export { SubmitButton }