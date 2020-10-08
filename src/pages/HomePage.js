import React, { useState, useEffect,} from 'react';
import { protectedWithAuth } from '../provider/Authentication';
import { CircularProgress} from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import { NoteContainer } from '../components/NoteContainer';
import { useWindowSize } from '../hooks/useWindowSize';
import Masonry from 'react-responsive-masonry';
import { LoadingBackdrop } from '../components/LoadingBackdrop';
import { ExpandableNotecontainer } from '../components/ExpandableNoteContainer';

const HomePageBase = (props) =>
{
    
    
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

    return (
        <div>
            <ExpandableNotecontainer/>
            {/* <div className={`flex-container center column`}>
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
            </div> */}
            <br/>
            <div className="row center">
                <h1>Your Notes</h1>
            </div>
            {
                isLoading
                ?   <div className="row center">
                        <CircularProgress color="secondary" />
                    </div>
                :   <React.Fragment>
                        {
                            notes.length > 0
                            ?   <Masonry className={`notes-container ${windowSize.width > 768? "start" : "space-between"}`} columnsCount={windowSize.width > 768? 7 : 2}>
                                {
                                    notes.map( (note, index) => {
                                            return (
                                                <NoteContainer key={note.id} note={note}/>
                                            )
                                        })
                                }
                                </Masonry>
                            
                            :   <div className="row center">
                                    <h2>You have no notes.</h2>
                                </div>    
                        }
                        
                    </React.Fragment>
            }
        </div>
    );
}
const loginCondition = authUser => authUser !== null;

export const HomePage = protectedWithAuth(loginCondition)(HomePageBase);
