import React, { useState, useEffect } from 'react';
import * as ROUTES from '../constants/routes';
import { withRouter, Link } from 'react-router-dom';
import { withFirebase } from '../provider/Firebase';
import { Card, Button,} from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import { useWindowSize } from '../hooks/useWindowSize';
import { EmailTextField } from '../components/EmailTextField';
import { PasswordTextField } from '../components/PasswordTextField';
import { SubmitButton } from '../components/SubmitButton';
import { withAuthContext } from '../provider/Authentication';

const SignInPageBase = (props) => {
    //hooks
    const Theme = HookTheme();
    let windowSize = useWindowSize();
    //state
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isInvalid, setIsInvalid] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isAuthReady = false
        let unsubFirebaseListener;

        props.firebase.auth.onAuthStateChanged((user) => {
            if (!isAuthReady) {
                isAuthReady = true
                if(user !== null) props.history.push(ROUTES.HOME);
            }
        })
        
        return unsubFirebaseListener;
    },[])
    const signIn = (evt) => {
        evt.preventDefault();

        props.firebase.loginWithEmailPassword(email,pass).then(
            async authUser => {
                props.history.push(ROUTES.HOME);
                
            }).catch(error =>
                {
                    if(error.code === 'auth/wrong-password')
                    {
                        setError('Invalid credentials');
                    }
                    else if(error.code === 'auth/user-not-found')
                    {
                        setError('User not found')
                    }
                    else
                    {
                        setError(error.code);
                    }
                }
            );
    }
    
    return (
        <div className={`flex-container column max-width`}>
            <form onSubmit={signIn}>
                <div className="row center">
                
                    <Card className={`${windowSize.width > 768? Theme.loginCard : Theme.loginCard_M} flex-container column`}>
                            <h1>Welcome Back!</h1>
                            <small className="login-subtitle">Log in to continue</small>
                            <EmailTextField email={email} setEmail={setEmail} error={error} setError={setError} setIsInvalid={setIsInvalid}/>
                            <br/>
                            <PasswordTextField pass={pass} setPass={setPass} label="Password"/>
                            <br/>
                            <SubmitButton disabled={isInvalid}>Log in</SubmitButton>
                    </Card>
                
                </div>
            </form>
            <div className="row center">
                <Button>
                    <Link className="no-style white-text" to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
                </Button>
            </div>
            <div className="row center">
                <small>Need an account?</small>
                <Button>
                    <Link className="no-style white-text" to={ROUTES.SIGN_UP}><small>Sign up</small></Link>
                </Button>
            </div>
            
        </div>
    );
}

export const SignInPage = withRouter(withFirebase(withAuthContext(SignInPageBase)));