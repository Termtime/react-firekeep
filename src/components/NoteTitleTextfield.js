import React from 'react';
import { TextField } from '@material-ui/core';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';

const NoteTitleTextfield = (props) => {
    const windowSize = useWindowSize();
    const Theme = HookTheme();
    return(
        <TextField
        className={`${windowSize.width > 768? Theme.darkNoteTitle : Theme.darkNoteTitle_M } `}
        placeholder="Title..."
        InputProps={{ disableUnderline: true }}
        inputProps={{ maxLength: 30, }}
        value={props.value}
        onChange={event => props.setNoteTitle(event.target.value)}
        />
    );
}

export {NoteTitleTextfield};