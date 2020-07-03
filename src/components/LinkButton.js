import React from 'react';
import { Button } from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkButton = (props) => {
    const Theme = HookTheme();

    return (
        <Link to={props.to} className="no-style"><Button variant="contained" color="primary">{props.children}</Button></Link>
    );
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
}

export { LinkButton };

