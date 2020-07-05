import React from 'react';
import { Paper} from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import * as ROUTES from '../constants/routes';
import { LinkButton } from '../components/LinkButton';
import { withFirebase } from '../provider/Firebase';
 const LandingPageBase = (props) =>{
    
    const Theme = HookTheme();

    return (
        <div className={` flex-container column center`}>
            <div className="row center max-width " style={{marginTop: '20px'}}>
                <Paper className={`${Theme.flexContainer} ${Theme.titlePaper} title ` } elevation={3}>
                    <h1>Firekeep</h1>
                    <h3>A simple <a href="https://keep.google.com" target="blank">keep.google.com</a> made in firebase</h3>
                </Paper>
            </div>
            <div className="row center">
                <div className="column center" style={{marginLeft:'20px'}}>
                    <Paper className={`${Theme.subtitlePaper} sub-paper column center`} elevation={3}>
                        <p>Quickly get started and Sign Up for our service</p>
                        <LinkButton to={ROUTES.SIGN_UP}>Get started</LinkButton>
                    </Paper>
                </div>
                <div className="column center">
                    <Paper className={`${Theme.subtitlePaper} sub-paper column center`} elevation={3}>
                        {props.firebase.auth.currentUser != null
                            ?   <div className="column center">
                                <p>You are already logged in!</p>
                                <LinkButton to={ROUTES.HOME}>My notes</LinkButton>
                                </div>
                            :   <div className="column center">
                                    <p>Already a member? </p>
                                    <LinkButton to={ROUTES.SIGN_IN}>Log in</LinkButton>    
                                </div>
                        }
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export const LandingPage = withFirebase(LandingPageBase);

