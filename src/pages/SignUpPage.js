import React, { useState } from 'react';
import { Card, Button } from '@material-ui/core';
import { EmailTextField } from '../components/EmailTextField';
import { PasswordTextField } from '../components/PasswordTextField';
import { SubmitButton } from '../components/SubmitButton';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { HookTheme } from '../constants/theme';
import { useWindowSize } from '../hooks/useWindowSize';
import { withFirebase } from '../provider/Firebase';

const SignUpPageBase = (props) => 
{
    const Theme = HookTheme();
    let windowSize = useWindowSize();

    const [emailState, setEmailState] = useState({email: '', error: null});
    const [passState, setPassState] = useState({pass: '', error: null});
    const [passState2, setPassState2] = useState({pass: '', error: null});

    const signUp = evt =>
    {
        evt.preventDefault();
        props.firebase.createUserWithEmailPassword(emailState.email, passState.pass).then(
            authUser => {
                //create user in firebase storage
                return props.firebase
                .users()
                .doc(authUser.user.uid) //document name or ID
                .set({email: emailState.email}); //document data
            }).then(() => props.history.push(ROUTES.HOME)).catch(error =>
            {
                if(error.code === 'auth/weak-password')
                {
                    setPassState({...passState, error: 'Password is too weak'});
                }
                else if(error.code === 'auth/email-already-in-use')
                {
                    setEmailState({...emailState, error: 'User already exists'})
                }
                else
                {
                    setEmailState({...emailState, error: error.code})
                }
            }
        );
    }

    const checkIsPassInValid = ( {p1=passState.pass, p2 = passState2.pass} ) => 
    {
        if(p1 !== '' && p2 !== '' && p1 === p2)
        {
            setPassState({pass:p1, error: null});
            setPassState2({pass:p2, error: null});
        }
        else{
            setPassState({pass:p1, error: 'Password must not be empty and both fields must match'});
            setPassState2({pass:p2, error: 'Password must not be empty and both fields must match'});
        }
    }

    const handlePassInput1 = pass =>
    {
        checkIsPassInValid( { p1 : pass });
    }

    const handlePassInput2 = pass =>
    {
        checkIsPassInValid( { p2 : pass });
    }
    return(
        <div className={`flex-container column max-width`}>
            <form onSubmit={signUp}>
                <div className="row center">
                    <Card className={`${windowSize.width > 768? Theme.loginCard : Theme.loginCard_M} flex-container column`}>
                            <h1>Sign up now</h1>
                            <small className="login-subtitle">Create an account to continue</small>
                            <EmailTextField emailState={emailState} setEmailState={(email, error) => setEmailState({email, error})}/>
                            <br/>
                            <PasswordTextField passState={passState} setPassState={(pass) => handlePassInput1(pass)} label="Password" error={passState.error}/>
                            <br/>
                            <PasswordTextField passState={passState2} setPassState={(pass) => handlePassInput2(pass)} label="Confirm Password" error={passState.error}/>
                            <br/>
                            <SubmitButton disabled={ (Boolean(passState.error) || Boolean(emailState.error)) ||  (passState.pass === '' && passState2.pass === '')}>Sign Up</SubmitButton>
                    </Card>    
                </div>
            </form>
            
            <div className="row center">
                <small>Have an account?</small>
                <Button>
                    <Link className="no-style white-text" to={ROUTES.SIGN_IN}><small>Log In</small></Link>
                </Button>
            </div>
            
        </div>
    );
}
export const SignUpPage = withRouter(withFirebase(SignUpPageBase));