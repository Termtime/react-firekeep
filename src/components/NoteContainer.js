import React, { useState } from 'react';
import { Paper, Fab, Menu, MenuItem, Backdrop } from '@material-ui/core';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';
import { MoreVert, Save, Close, Delete } from '@material-ui/icons';
import { withFirebase } from '../provider/Firebase';
import { NoteTitleTextfield } from './NoteTitleTextfield';
import { NoteBodyTextfield } from './NoteBodyTextfield';

const NoteContainerBase = (props) =>{
    const windowSize = useWindowSize()
    const Theme = HookTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [noteTitle, setNoteTitle] = useState(props.note.title);
    const [noteBody, setNoteBody] = useState(props.note.body);
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const deleteNote= (docId) =>
    {
        props.firebase.userNotes(props.firebase.auth.currentUser.uid)
        .doc(docId).delete();
        closeMenu();
        closeNote();
    }

    const closeMenu = () => 
    {
        setAnchorEl(null);
    }

    const openMenu = (event) =>
    {
        setAnchorEl(event.currentTarget);        
    }

    const openNote = (event) =>
    {
        setIsOpen(true);
        setNoteTitle(props.note.title);
        setNoteBody(props.note.body);
    }

    const closeNote = (event) =>
    {
        setIsOpen(false);
    }

    const editNote = (event) =>
    {
        props.firebase.userNotes(props.firebase.auth.currentUser.uid).doc(props.note.id).update({title: noteTitle, body: noteBody}).then(
            () => {
                closeNote(null);
            }
        );

        
    }
    return (
        <div>
            <div>
            <Backdrop open={isOpen} className={Theme.backdrop}>
                <Paper className={`${Theme.flexContainer} ${Theme.notePaper} ${windowSize.width > 768? "note-editor": "note-editor-m"}`} elevation={3}>
                    <Fab color="secondary" size="small" className="fab-right-top-corner" onClick={closeNote}><Close/></Fab>

                    <Menu 
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    keepMounted
                    onClose={closeMenu}
                    >
                        <MenuItem onClick={() => deleteNote(props.note.id)}>Delete Note</MenuItem>
                    </Menu>

                    <NoteTitleTextfield value={noteTitle} setNoteTitle={setNoteTitle}/>
                    <NoteBodyTextfield value={noteBody} setNoteBody={setNoteBody} setIsWriting={() => {}}/>
                    <div className="row space-between">
                        <div className="end column ">
                            <Fab color="primary" size="small" className="note-fab-right-down-center" onClick={() => editNote()} ><Save/></Fab>
                        </div>
                        <div className="column end">
                            <Fab color="secondary" size="small" className="fab-right-down-corner" onClick={() => deleteNote(props.note.id)} ><Delete/></Fab>
                        </div>
                    </div>
                </Paper>
            </Backdrop>
            </div>
            <div className={`note  `} >
                <Paper className={`${Theme.flexContainer} ${Theme.notePaper}  note`} elevation={3} onClick={openNote}>
                    <Fab color="primary" size="small" className="note-fab-right-top-corner" onClick={openMenu}><MoreVert/></Fab>
                    <Menu 
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    keepMounted
                    onClose={closeMenu}
                    >
                        <MenuItem onClick={() => deleteNote(props.note.id)}>Delete Note</MenuItem>
                    </Menu>
                    <h3 className="noteTitle hideOverflow">{props.note.title}</h3>
                    <p className="noteBody">{props.note.body.length > 260? props.note.body.substring(0,260) + "..." : props.note.body}</p>
                </Paper>
            </div>
        </div>
    );
}

export const NoteContainer = withFirebase(NoteContainerBase);