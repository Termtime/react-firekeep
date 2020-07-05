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

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(true);
    const [isPassInvalid, setIsPassInvalid] = useState(true);
    const [isInvalid, setIsInvalid] = useState(true);
    const [error, setError] = useState('');
    const [passError, setPassError] = useState('');

    const signUp = evt =>
    {
        evt.preventDefault();
        if(pass !== pass2)
        {
            setPassError('Both passwords must match');
        }

        props.firebase.createUserWithEmailPassword(email, pass).then(
            authUser => {
                //create user in firebase storage
                console.log(authUser);
                return props.firebase
                .users()
                .doc(authUser.user.uid) //document name
                .set({email: email}); //document data
            }).then(() => props.history.push(ROUTES.SIGN_IN)).catch(error =>
            {
                if(error.code === 'auth/weak-password')
                {
                    setPassError('Password is too weak');
                }
                else if(error.code === 'auth/email-already-in-use')
                {
                    setError('User already exists')
                }
                else
                {
                    console.log(error);
                    setError(error.code);
                }
            }
        );
    }

    const checkIfInvalid = (email, isInvalid = true) =>
    {
        setEmail(email);
        
        if(!isInvalid && !isPassInvalid) setIsInvalid(false);
        else setIsInvalid(true);
    }
    const checkIsPassInValid = ( {p1=pass, p2 = pass2} ) => 
    {
        if(p1 !== '' && p2 !== '' && p1 === p2)
        {
            setIsPassInvalid(false);
            setPassError('');
            if(!isEmailInvalid) setIsInvalid(false);
        }
        else{
            setIsPassInvalid(true);
            setIsInvalid(true);
            setPassError('Password must not be empty and both fields must match');
        }
    }

    const handlePassInput1 = value =>
    {
        setPass(value);
        checkIsPassInValid( { p1 : value });
    }

    const handlePassInput2 = value =>
    {
        setPass2(value);
        checkIsPassInValid( { p2 : value });
    }
    return(
        <div className={`flex-container column max-width`}>
            <form onSubmit={signUp}>
                <div className="row center">
                    <Card className={`${windowSize.width > 768? Theme.loginCard : Theme.loginCard_M} flex-container column`}>
                            <h1>Sign up now</h1>
                            <small className="login-subtitle">Create an account to continue</small>
                            <EmailTextField email={email} setEmail={checkIfInvalid} error={error} setError={setError} setIsInvalid={setIsEmailInvalid}/>
                            <br/>
                            <PasswordTextField pass={pass} setPass={handlePassInput1} label="Password" error={passError}/>
                            <br/>
                            <PasswordTextField pass={pass2} setPass={handlePassInput2} label="Confirm Password" error={passError}/>
                            <br/>
                            <SubmitButton disabled={isInvalid} >Sign Up</SubmitButton>
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