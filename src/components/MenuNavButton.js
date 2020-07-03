import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import { HookTheme } from '../constants/theme';

export const MenuNavButton = (props) => {
    const Theme = HookTheme();

    return (
        <div className="row">
        <Link className="no-style expand" to={props.to} onClick={props.onClick}><MenuItem alignItems="center" classes={{root: Theme.alignLeft}} className={`${props.first? Theme.firstMenuItem : Theme.consecutiveMenuItem} start`}>{props.children}</MenuItem></Link>
        </div>
    );
}