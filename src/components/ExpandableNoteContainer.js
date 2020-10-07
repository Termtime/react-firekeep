import React, { useState} from 'react';
import { withFirebase } from '../provider/Firebase';
import { Paper, Fab, CircularProgress, Tooltip} from '@material-ui/core';
import { Close, Save} from '@material-ui/icons';
import { HookTheme } from '../constants/theme';
import { NoteTitleTextfield } from './NoteTitleTextfield';
import { NoteBodyTextfield } from './NoteBodyTextfield';
const ExpandableNoteContainerBase = (props) => {
    
    const Theme = HookTheme();
    const [isWriting, setIsWriting] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');

    const clearNote = () => {
        setIsWriting(false);
        setNoteTitle('');
        setNoteBody('');
    }

    const addNote = () =>
    {
        if(noteBody === "") return;
        props.firebase.userNotes(props.firebase.auth.currentUser.uid)
        .add({title: noteTitle, body: noteBody}) //doc title gets randomly generated, add title and body of note
        .then(
            () => clearNote()
        )
    }

    return (
        <div className={`flex-container center column`}>
            <Paper className={`${Theme.flexContainer} ${Theme.notePaper} title `} onFocus={()=>setIsWriting(true)}>
                    { isWriting ?
                            <React.Fragment>
                                <Tooltip title="Close">
                                    <Fab color="secondary" size="small" className="fab-right-top-corner" onClick={() => clearNote()} ><Close /></Fab>
                                </Tooltip>
                                <NoteTitleTextfield value={noteTitle} setNoteTitle={setNoteTitle}/>
                            </React.Fragment>
                        :
                        null
                    }
                    
                    <div className="row center">
                        <NoteBodyTextfield value={noteBody} setNoteBody={setNoteBody} setIsWriting={setIsWriting}/>
                    </div>
                    { isWriting ?
                            <Tooltip title="Add note">
                                <Fab color="primary" size="small" className="fab-right-down-center" onClick={() => addNote()} ><Save/></Fab>
                            </Tooltip>
                        :
                        null
                    }
            </Paper>
        </div>
    );
}

export const ExpandableNotecontainer = withFirebase(ExpandableNoteContainerBase);