import React, { useState, Fragment } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { HookTheme } from '../constants/theme';
import { Card } from '@material-ui/core';
import { SubmitButton } from '../components/SubmitButton';
import { EmailTextField } from '../components/EmailTextField';
import { withFirebase } from '../provider/Firebase';

const PassForgetBase = (props) => 
{
    const Theme = HookTheme();
    const windowSize = useWindowSize();

    //state
    const [email, setEmail] = useState('');
    const [isInvalid, setIsInvalid] = useState(true);
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const sendEmail = (event) => 
    {
        event.preventDefault();
        props.firebase.passwordReset(email);
        setTimeout(setEmailSent(true),500);
    }
    
    return (
        <div className={`flex-container column max-width`}>
            <form onSubmit={sendEmail}>
                <div className="row center">
                    <Card className={`${windowSize.width > 768? Theme.loginCard : Theme.loginCard_M} flex-container column`}>
                        {emailSent 
                            ? <h1>Email sent!</h1>
                            : <h1>Password Recovery</h1>
                        }
                        {emailSent
                            ? <p>If the email is in our database, an email will be sent to the account's email to reset your password</p>
                            : <small>Enter your account's email</small>
                        }
                        {emailSent
                            ?   null
                            :   <React.Fragment>
                                    <EmailTextField email={email} setEmail={setEmail} error={error} setError={setError} setIsInvalid={setIsInvalid}/>
                                    <SubmitButton disabled={isInvalid} onClick={sendEmail}>Send email</SubmitButton>
                                </React.Fragment>
                        }
                        
                    </Card>
                </div>
            </form>
        </div>
    );
    
}

export const PassForgetPage = withFirebase(PassForgetBase);