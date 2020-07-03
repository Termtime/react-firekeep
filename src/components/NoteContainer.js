import React, { useState } from 'react';
import { Paper, Fab, Menu, MenuItem } from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import { MoreVert } from '@material-ui/icons';
import { withFirebase } from '../provider/Firebase';
import { NoteEditor } from './NoteEditor';

const NoteContainerBase = (props) =>{
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
        <div key={props.key}>
            <div>
                <NoteEditor
                    isOpen={isOpen}
                    anchorEl={anchorEl} 
                    noteBody={noteBody} 
                    noteTitle={noteTitle} 
                    setNoteBody={setNoteBody} 
                    setNoteTitle={setNoteTitle} 
                    closeNote={closeNote} 
                    editNote={editNote}
                    deleteNote={deleteNote}
                    noteId={props.note.id}/>
            </div>
            <div className={`note`} >
                <Paper className={`${Theme.flexContainer} ${Theme.notePaper} column  note`} elevation={3}>
                    <Fab  color="primary" size="small" className="note-fab-right-top-corner" onClick={openMenu}><MoreVert/></Fab>
                    <Menu 
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    keepMounted
                    onClose={closeMenu}>
                        <MenuItem onClick={() => deleteNote(props.note.id)}>Delete Note</MenuItem>
                    </Menu>
                    <div onClick={openNote} className="note-info-container column">
                        <h3 className="noteTitle hideOverflow">{props.note.title}</h3>
                        <p className="noteBody hideOverflow"><span style={{whiteSpace:"pre-line"}}>{props.note.body.length > 260? props.note.body.substring(0,260) + "..." : props.note.body}</span></p>
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export const NoteContainer = withFirebase(NoteContainerBase);