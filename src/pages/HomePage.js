import React, { useState, useEffect,} from 'react';
import { protectedWithAuth } from '../provider/Authentication';
import { withFirebase } from '../provider/Firebase';
import { Paper, Fab, CircularProgress} from '@material-ui/core';
import { Close, Save} from '@material-ui/icons';
import { HookTheme } from '../constants/theme';
import { NoteContainer } from '../components/NoteContainer';
import { NoteTitleTextfield } from '../components/NoteTitleTextfield';
import { NoteBodyTextfield } from '../components/NoteBodyTextfield';
import { useWindowSize } from '../hooks/useWindowSize';
import Masonry from 'react-responsive-masonry';

const HomePageBase = (props) =>
{
    
    const [isWriting, setIsWriting] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Theme = HookTheme();
    const windowSize = useWindowSize();

    //componentDidMount
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
            console.log(allNotes);
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
        props.firebase.userNotes(props.firebase.auth.currentUser.uid)
        .add({title: noteTitle, body: noteBody}) //doc title gets randomly generated, add title and body of note
        .then(
            () => clearNote()
        )
    }

    /* /user-notes/test@test.com/user-notes/OSaRYqKZvTenV1Kl5hKc  */
    return (
        <div>
            <div className={`flex-container center column`}>
                <Paper className={`${Theme.flexContainer} ${Theme.notePaper} title `} onFocus={()=>setIsWriting(true)}>
                        { isWriting ?
                                <Fab color="secondary" size="small" className="fab-right-top-corner" onClick={() => clearNote()} ><Close /></Fab>
                            :
                            null
                        }
                        { isWriting 
                            ?   <NoteTitleTextfield value={noteTitle} setNoteTitle={setNoteTitle}/>
                            :   null
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
                ?   <div className="flex-container row center"> 
                        <div className="flex-container column center">
                            <CircularProgress color="secondary" />
                        </div> 
                    </div> 
                :   null
            }
            <Masonry className={`notes-container ${windowSize.width > 768? "start" : "space-between"}`} columnsCount={windowSize.width > 768? 7 : 2}>
            {
                notes.map( (note, index) => {
                    return (
                        <NoteContainer note={note}/>
                    )
                })
            }
            </Masonry>
        </div>
    );
}
//max-width
const loginCondition = authUser => authUser !== null;

export const HomePage = protectedWithAuth(loginCondition)(HomePageBase);
