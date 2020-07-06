import React, { useState, useEffect } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';
import { Card, Avatar, TextField, Divider } from '@material-ui/core';
import { withFirebase } from '../provider/Firebase';
import { EmailTextField } from '../components/EmailTextField';
import { PasswordTextField } from '../components/PasswordTextField';
import { SubmitButton } from '../components/SubmitButton';
import { withAuthContext } from '../provider/Authentication';

const ProfilePageBase = (props) => {
    const windowSize = useWindowSize();
    const Theme = HookTheme();
    const [displayNameState, setDisplayNameState] = useState({displayName : '', error: null});
    const [passwordState, setPasswordState] = useState({oldPass : '', newPass: '', error: null});
    const [newEmailState, setNewEmailState] = useState({email : '', error: null});

    const handleDisplayNameChange = (evt) => {
        evt.preventDefault();
    }

    const handlePasswordChange = (evt) => {
        evt.preventDefault()
    }
    
    const handleEmailChange = (evt) => {
        evt.preventDefault();
    }


    return (
        <div className="column center">
            <div className="row center">
                <Card className={`${windowSize.width > 768? Theme.loginCard : Theme.loginCard_M} flex-container column`}>
                        <h1>Profile</h1>
                        <Divider/>
                        <div className="row center">
                        <Avatar className={Theme.bigAvatar} src={props.authUser != null ? props.authUser.photoURL : ""} />
                        </div>
                        <h2>{props.authUser != null ? props.authUser.displayName : ""}</h2>
                        <form onSubmit={handleDisplayNameChange}>
                        <TextField
                        label="Display Name"
                        placeholder={props.authUser != null ? props.authUser.displayName : ""}
                        value={displayNameState.displayName}
                        error={displayNameState.error}
                        onChange={(evt) => setDisplayNameState({...displayNameState, displayName:evt.target.value})}
                        />
                        <div>
                            <SubmitButton disabled={Boolean(displayNameState.error)}>Change display name</SubmitButton>
                        </div>
                        </form>
                        <br/>
                        <Divider/>
                        <h3>Change your Email</h3>
                        <form onSubmit={handleEmailChange}>
                            <EmailTextField
                            error={newEmailState.error}
                            // email={newEmailState.email} 
                            setEmail={(email, isInvalid) => setNewEmailState({...newEmailState, email})}
                            setError={(error) => setNewEmailState({...newEmailState, error})}/>
                            <SubmitButton disabled={Boolean(newEmailState.error)}>Change Email</SubmitButton>
                        </form>
                        <Divider/>
                        
                        <h3>Change your password</h3>
                        <form onSubmit={handlePasswordChange}>
                            <div className="row">
                                
                                    <PasswordTextField/>
                                    <PasswordTextField/>
                            </div>
                                <SubmitButton>Change password</SubmitButton>
                        </form>
                        <br/>
                </Card>
            </div>
        </div>
    );
}

export const ProfilePage = withAuthContext(withFirebase(ProfilePageBase));