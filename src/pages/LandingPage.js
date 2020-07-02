import React from 'react';
import { Paper} from '@material-ui/core';
import { HookTheme } from '../constants/theme';
import * as ROUTES from '../constants/routes';
import { LinkButton } from '../components/LinkButton';

 const LandingPageBase = (props) =>{
    
    const Theme = HookTheme();

    return (
        <div className={` ${Theme.flexContainer} center column `}>
            <div className="row center max-width " style={{marginTop: '20px'}}>
                <Paper className={`${Theme.flexContainer} ${Theme.titlePaper} title ` } elevation={3}>
                    <h1>Firekeep</h1>
                    <h3>A simple <a href="https://keep.google.com" target="blank">keep.google.com</a> made in firebase</h3>
                </Paper>
            </div>
            <div className="row center">
                <div className="column" style={{marginLeft:'20px'}}>
                    <Paper className={`${Theme.subtitlePaper}`} elevation={3}>
                        <p>Quickly get started and Sign Up for our service</p>
                        <LinkButton to={ROUTES.SIGN_UP}>Get started</LinkButton>
                    </Paper>
                </div>
                <div className="column">
                    <Paper className={`${Theme.subtitlePaper}`} elevation={3}>
                        <p>Already a member? </p>
                        <LinkButton to={ROUTES.SIGN_IN}>Log in</LinkButton>    
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export const LandingPage = LandingPageBase;

