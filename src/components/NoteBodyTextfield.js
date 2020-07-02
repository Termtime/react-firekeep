import React from 'react';
import { TextField } from '@material-ui/core';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';
import PropTypes from 'prop-types';

const NoteBodyTextfield = (props) => 
{
    const windowSize = useWindowSize();
    const Theme = HookTheme();
    return(
        <TextField
        className={`${windowSize.width > 768? Theme.darkNoteInput : Theme.darkNoteInput_M }`}
        placeholder="Take a note..."
        InputProps={{ disableUnderline: true }}
        multiline
        onFocus={() => props.setIsWriting(true)}
        value={props.value}
        onChange={event => props.setNoteBody(event.target.value)}
        />
    );
}

NoteBodyTextfield.propTypes = {
    setIsWriting: PropTypes.func.isRequired,
    setNoteBody: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}
export {NoteBodyTextfield};