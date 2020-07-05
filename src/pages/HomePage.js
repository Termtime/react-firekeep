import React, { useState, useEffect,} from 'react';
import { protectedWithAuth } from '../provider/Authentication';
import { Paper, Fab} from '@material-ui/core';
import { Close, Save} from '@material-ui/icons';
import { HookTheme } from '../constants/theme';
import { NoteContainer } from '../components/NoteContainer';
import { NoteTitleTextfield } from '../components/NoteTitleTextfield';
import { NoteBodyTextfield } from '../components/NoteBodyTextfield';
import { useWindowSize } from '../hooks/useWindowSize';
import Masonry from 'react-responsive-masonry';
import { LoadingBackdrop } from '../components/LoadingBackdrop';

const HomePageBase = (props) =>
{
    
    const [isWriting, setIsWriting] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Theme = HookTheme();
    const windowSize = useWindowSize();

    useEffect( () => {
        let isAuthReady = false
        let unsubFirebaseListener;

        props.firebase.auth.onAuthStateChanged((user) => {
            if (!isAuthReady) {
                isAuthReady = true
                unsubFirebaseListener = getNotesFromFirebase();
                setTimeout(() => setIsLoading(false), 500);
            }
        })
        
        return unsubFirebaseListener;
    },[]);

    const getNotesFromFirebase =  () => {
        if(props.firebase.auth.currentUser !== null)
        return props.firebase.userNotes(props.firebase.auth.currentUser.uid).onSnapshot( snapshot => {
            let allNotes = snapshot.docs.map( doc => ({id:doc.id, title: doc.data().title, body: doc.data().body}))
            setNotes(allNotes);
        })
    }

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
        <div>
            <div className={`flex-container center column`}>
                <Paper className={`${Theme.flexContainer} ${Theme.notePaper} title `} onFocus={()=>setIsWriting(true)}>
                        { isWriting ?
                                <React.Fragment>
                                    <Fab color="secondary" size="small" className="fab-right-top-corner" onClick={() => clearNote()} ><Close /></Fab>
                                    <NoteTitleTextfield value={noteTitle} setNoteTitle={setNoteTitle}/>
                                </React.Fragment>
                            :
                            null
                        }
                        
                        <div className="row center">
                            <NoteBodyTextfield value={noteBody} setNoteBody={setNoteBody} setIsWriting={setIsWriting}/>
                        </div>
                        { isWriting ?
                                <Fab color="primary" size="small" className="fab-right-down-center" onClick={() => addNote()} ><Save/></Fab>
                            :
                            null
                        }
                </Paper>
                <br/>
                
            </div>
            <div className="row center">
                <h1>Your Notes</h1>
            </div>
            {
                isLoading
                ?   <LoadingBackdrop/> 
                :   null
            }
            <Masonry className={`notes-container ${windowSize.width > 768? "start" : "space-between"}`} columnsCount={windowSize.width > 768? 7 : 2}>
            {
                notes.map( (note, index) => {
                    return (
                        <NoteContainer key={note.id} note={note}/>
                    )
                })
            }
            </Masonry>
        </div>
    );
}
const loginCondition = authUser => authUser !== null;

export const HomePage = protectedWithAuth(loginCondition)(HomePageBase);
