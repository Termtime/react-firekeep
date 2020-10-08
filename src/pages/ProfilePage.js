import React, { useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';
import { Card, Avatar, TextField, Divider, Backdrop, Snackbar } from '@material-ui/core';
import { withFirebase } from '../provider/Firebase';
import { EmailTextField } from '../components/EmailTextField';
import { PasswordTextField } from '../components/PasswordTextField';
import { SubmitButton } from '../components/SubmitButton';
import { withAuthContext } from '../provider/Authentication';
import noImage from '../assets/img/no-pp-image.jpg';
import { ContainerButton } from '../components/ContainerButton';
import { DropzoneDialog } from 'material-ui-dropzone';
import { LoadingBackdrop } from '../components/LoadingBackdrop';
import Alert from '@material-ui/lab/Alert';

const ProfilePageBase = (props) => {
    const windowSize = useWindowSize();
    const Theme = HookTheme();
    //textfield states
    const [displayNameState, setDisplayNameState] = useState({displayName : '', error: null});
    const [passState, setPassState] = useState({pass: '', error: null});
    const [passState2, setPassState2] = useState({pass: '', error: null});
    const [newEmailState, setNewEmailState] = useState({email : '', error: null});
    //img backdrop state
    const [imgOpen, setImgOpen] = useState(false);
    //dropzone state
    const [isDropZoneOpen, setIsDropZoneOpen] = useState(false);
    const [loadingBackdropVisible, setLoadingBackDropVisible] = useState(false);
    //snackbar open states
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState({open: false, error: null});

    const handleDisplayNameChange = (evt) => {
        evt.preventDefault();
        props.firebase.updateProfileInfo({displayName: displayNameState.displayName}).then(
            info => {
                setOpenSuccessSnackbar(true);
            }
        )
    }

    const handlePasswordChange = (evt) => {
        evt.preventDefault();
        if(props.firebase.auth.currentUser.email === 'test@test.com'){
            setOpenErrorSnackbar({open: true, error:'For testing purposes, you cannot change the password on the demo account'})
            return;
        }
        props.firebase.auth.currentUser.updatePassword(passState.pass).then(
            info => {
                setOpenSuccessSnackbar(true);
            }
        ).catch(error => {
            switch(error.code)
            {
                case "auth/invalid-email":
                    setOpenErrorSnackbar({open: true, error:'Email entered is invalid'});
                break;
                case "auth/email-already-in-use":
                    setNewEmailState({...newEmailState, error: 'Error is already in use'});
                break;
                case "auth/requires-recent-login":
                    if(props.firebase.auth.currentUser.providerData.providerId === 'password')
                    {
                        props.firebase.auth.currentUser.reauthenticateWithCredential().then(
                            info =>  props.firebase.auth.updateEmail(newEmailState.email)
                        ).catch(error => {
                            switch(error.code)
                            {
                                case "auth/user-mismatch":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid credentials for this user'})
                                break;
                                case "auth/user-not-found":
                                    setOpenErrorSnackbar({open: true, error: 'User not found'})
                                break;                                    
                                case "auth/invalid-credential":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid credentials'})
                                break;
                                case "auth/invalid-email":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid email'})
                                break;
                                case "auth/wrong-password":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid credentials for this user'})
                                break;
                                case "auth/invalid-verification-code":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid verification code'})
                                break;
                                case "auth/invalid-verification-id":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid verification id'})
                                break;
                                default:
                                    setOpenErrorSnackbar({open: true, error: error.code})
                            }
                        })
                    }
                    else{
                        props.firebase.auth.currentUser.reauthenticateWithPopup().then(
                            info =>  props.firebase.auth.currentUser.updatePassword(passState.pass).then(
                                info => {
                                    setOpenSuccessSnackbar(true);
                                }
                            )
                        ).catch(
                            error => {
                                switch(error.code)
                                {
                                    case "auth/auth-domain-config-required":
                                        setOpenErrorSnackbar({open: true, error: 'This option hasnt been configured yet, contact support for more help'});
                                    break;
                                    case "auth/cancelled-popup-request":
                                        setOpenErrorSnackbar({open: true, error: 'You need to log in to change this option'});
                                    break;
                                    case "auth/user-mismatch":
                                        setOpenErrorSnackbar({open: true, error: error.code});
                                    break;
                                    case "auth/operation-not-allowed":
                                        setOpenErrorSnackbar({open: true, error: 'This login option is not enabled for this application'});
                                    break;
                                    case "auth/popup-blocked":
                                        setOpenErrorSnackbar({open: true, error: 'Popup was blocked, please enable popups'});
                                    break;
                                    case "auth/operation-not-supported-in-this-environment":
                                        setOpenErrorSnackbar({open: true, error: 'Operation not supported'});
                                    break;
                                    case "auth/unauthorized-domain":
                                        setOpenErrorSnackbar({open: true, error: 'Domain not authorized to sign in'});
                                    break;
                                    default:
                                        setOpenErrorSnackbar({open: true, error: error.code});
                                }
                            }
                        );
                    }
                break;
                default:
                    setOpenErrorSnackbar({open: true, error: error.code})
            }
        })
    }
    
    const handleEmailChange = (evt) => {
        evt.preventDefault();
        props.firebase.auth.currentUser.updateEmail(newEmailState.email).then(
            info => {
                setOpenSuccessSnackbar(true);
            }
        ).catch(error => {
            switch(error.code)
            {
                case "auth/invalid-email":
                    setOpenErrorSnackbar({open: true, error:'Email entered is invalid'});
                break;
                case "auth/email-already-in-use":
                    setNewEmailState({...newEmailState, error: 'Error is already in use'});
                break;
                case "auth/requires-recent-login":
                    if(props.firebase.auth.currentUser.providerData.providerId === 'password')
                    {
                        props.firebase.auth.currentUser.reauthenticateWithCredential().then(
                            info =>  props.firebase.auth.updateEmail(newEmailState.email)
                        ).catch(error => {
                            switch(error.code)
                            {
                                case "auth/user-mismatch":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid credentials for this user'})
                                break;
                                case "auth/user-not-found":
                                    setOpenErrorSnackbar({open: true, error: 'User not found'})
                                break;                                    
                                case "auth/invalid-credential":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid credentials'})
                                break;
                                case "auth/invalid-email":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid email'})
                                break;
                                case "auth/wrong-password":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid credentials for this user'})
                                break;
                                case "auth/invalid-verification-code":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid verification code'})
                                break;
                                case "auth/invalid-verification-id":
                                    setOpenErrorSnackbar({open: true, error: 'Invalid verification id'})
                                break;
                                default:
                                    setOpenErrorSnackbar({open: true, error: error.code})
                            }
                        })
                    }
                    else{
                        props.firebase.auth.currentUser.reauthenticateWithPopup().then(
                            info =>  props.firebase.auth.updateEmail(newEmailState.email)
                        ).catch(
                            error => {
                                switch(error.code)
                                {
                                    case "auth/auth-domain-config-required":
                                        setOpenErrorSnackbar({open: true, error: 'This option hasnt been configured yet, contact support for more help'});
                                    break;
                                    case "auth/cancelled-popup-request":
                                        setOpenErrorSnackbar({open: true, error: 'You need to log in to change this option'});
                                    break;
                                    case "auth/user-mismatch":
                                        setOpenErrorSnackbar({open: true, error: error.code});
                                    break;
                                    case "auth/operation-not-allowed":
                                        setOpenErrorSnackbar({open: true, error: 'This login option is not enabled for this application'});
                                    break;
                                    case "auth/popup-blocked":
                                        setOpenErrorSnackbar({open: true, error: 'Popup was blocked, please enable popups'});
                                    break;
                                    case "auth/operation-not-supported-in-this-environment":
                                        setOpenErrorSnackbar({open: true, error: 'Operation not supported'});
                                    break;
                                    case "auth/unauthorized-domain":
                                        setOpenErrorSnackbar({open: true, error: 'Domain not authorized to sign in'});
                                    break;
                                    default:
                                        setOpenErrorSnackbar({open: true, error: error.code});
                                }
                            }
                        );
                    }
                break;
                default:
                    setOpenErrorSnackbar({open: true, error: error.code})
            }
        })
    }

    const handleAvatarClick = (evt) => {
        setImgOpen(true);
    }

    const uploadProfilePicture = (files) => {
        console.log(files);
        setIsDropZoneOpen(false);
        setLoadingBackDropVisible(true);

        props.firebase.currentUserStorage().child('profilePic/pp.jpg').put(files[0]).then(
            snapshot => {
                //update user photo in firebase auth
                props.firebase.updateProfileInfo({photoUrl: snapshot.ref.location.path}).then(info => setLoadingBackDropVisible(false));
            }
        ).catch(error => {
            setLoadingBackDropVisible(false);
            setOpenErrorSnackbar({open: true, error: 'Error updating profile photo'});
        });
        
    }

    const handleSnackbarClose = (evt) => {
        setOpenSuccessSnackbar(false);
        setOpenErrorSnackbar({...openErrorSnackbar, open: false});
    }
    return (
        <div className="column center">
            <LoadingBackdrop visible={loadingBackdropVisible} />
            <Backdrop open={imgOpen} onClick={() => setImgOpen(false)} className={Theme.backdrop}>
                <div>
                    <Avatar className={Theme.xlAvatar} src={props.authUser != null ? props.authUser.photoURL : noImage} alt="profile-pic"/>
                </div>
            </Backdrop>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openErrorSnackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <p>{openErrorSnackbar.error}</p>
            </Snackbar>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openSuccessSnackbar}  autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert severity="success" onClose={handleSnackbarClose}>
                    Profile info updated successfully
                </Alert>
            </Snackbar>
            <LoadingBackdrop open={loadingBackdropVisible}/>
            <DropzoneDialog
            filesLimit={1}
            open={isDropZoneOpen}
            onSave={(files) => uploadProfilePicture(files)}
            acceptedFiles={['image/jpeg', 'image/png']}
            showPreview={true}
            maxFileSize={5000000}
            onClose={() => setIsDropZoneOpen(false)}
            />
            <div className="row center">
                <Card className={`${windowSize.width > 768? Theme.loginCard : Theme.loginCard_M} flex-container column`}>
                        <h1>Profile</h1>
                        <Divider classes={{root: Theme.whiteDivider}} />
                        <br/>
                        <div className="row center">
                        <Avatar onClick={handleAvatarClick} className={`${Theme.bigAvatar} avatar`} src={props.authUser != null ? props.authUser.photoURL : noImage} />
                        </div>
                        <br/>
                        <ContainerButton onClick={() => setIsDropZoneOpen(true)}>Update profile picture</ContainerButton>
                        <h2>{props.authUser != null ? props.authUser.displayName : ""}</h2>
                        <form onSubmit={handleDisplayNameChange}>
                            <TextField
                            label="Display Name"
                            placeholder={props.authUser != null ? props.authUser.displayName : ""}
                            value={props.authUser != null ? displayNameState.displayName : ""}
                            error={displayNameState.error}
                            className={`${windowSize.width > 768? Theme.darkInput : Theme.darkInput_M }`}
                            onChange={(evt) => setDisplayNameState({...displayNameState, displayName:evt.target.value})}
                            />
                            <div>
                                <SubmitButton disabled={Boolean(displayNameState.error) || displayNameState.displayName === ''}>Change display name</SubmitButton>
                            </div>
                        </form>
                        <br/>
                        <Divider classes={{root: Theme.whiteDivider}} />
                        <h3>Change your Email</h3>
                        <form onSubmit={handleEmailChange}>
                            <EmailTextField
                            emailState={newEmailState}
                            setEmailState={(email, error) => setNewEmailState({email, error})}/>
                            <SubmitButton disabled={Boolean(newEmailState.error) || newEmailState.email === ''}>Change Email</SubmitButton>
                        </form>
                        <Divider classes={{root: Theme.whiteDivider}} />
                        
                        <h3>Change your password</h3>
                        <form onSubmit={handlePasswordChange}>
                            <div className="column center">
                                <PasswordTextField passState={passState} 
                                setPassState={(pass) => setPassState({...passState, pass})}
                                label="New password"/>
                                <PasswordTextField passState={passState2}
                                setPassState={(pass) => setPassState2({...passState2, pass})}
                                label="Confirm password" />
                            </div>
                                <SubmitButton disabled={Boolean(passState.error) || passState.pass === '' || passState2.pass === ''}>Change password</SubmitButton>
                        </form>
                        <br/>
                </Card>
            </div>
        </div>
    );
}

export const ProfilePage = withAuthContext(withFirebase(ProfilePageBase));