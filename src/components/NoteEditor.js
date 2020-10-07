import React from 'react';
import { Backdrop, Paper, Fab, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import { useWindowSize } from '../hooks/useWindowSize';
import { NoteTitleTextfield } from './NoteTitleTextfield';
import { NoteBodyTextfield } from './NoteBodyTextfield';
import { Save, Delete, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

export const NoteEditor = (props) => {

    const Theme = HookTheme();
    const windowSize = useWindowSize();
    return (
        <Backdrop open={props.isOpen} className={Theme.backdrop}>
                <Paper className={`${Theme.flexContainer} ${Theme.notePaper} ${windowSize.width > 768? "note-editor": "note-editor-m"}`} elevation={3}>
                    <Tooltip title="Close">
                        <Fab color="secondary" size="small" className="fab-right-top-corner" onClick={props.closeNote}><Close/></Fab>
                    </Tooltip>

                    <Menu 
                    open={Boolean(props.anchorEl)}
                    anchorEl={props.anchorEl}
                    keepMounted
                    onClose={props.closeMenu}
                    >
                        <MenuItem onClick={() => props.eleteNote(props.noteId)}>Delete Note</MenuItem>
                    </Menu>

                    <NoteTitleTextfield value={props.noteTitle} setNoteTitle={props.setNoteTitle}/>
                    <NoteBodyTextfield value={props.noteBody} setNoteBody={props.setNoteBody} setIsWriting={() => {}}/>
                    <div className="column">
                        <div className="row center">
                            <Tooltip title="Save">
                                <Fab color="primary" size="small" className="note-fab-right-down-center" onClick={() => props.editNote()} ><Save/></Fab>
                            </Tooltip>
                        </div>
                        <div className="row end">
                            <Tooltip title="Delete note">
                                <Fab color="secondary" size="small" className="note-fab-right-down-corner" onClick={() => props.deleteNote(props.noteId)} ><Delete/></Fab>
                            </Tooltip>
                        </div>
                    </div>
                </Paper>
        </Backdrop>
    );
}

NoteEditor.propTypes = {
    anchorEl: PropTypes.any,
    noteTitle: PropTypes.string.isRequired,
    noteBody: PropTypes.string.isRequired,
    setNoteTitle: PropTypes.func.isRequired,
    setNoteBody: PropTypes.func.isRequired,
    closeNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    noteId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
}
