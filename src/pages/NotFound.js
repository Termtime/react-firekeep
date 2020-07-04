import React from 'react';
import { LinkButton } from '../components/LinkButton';
import * as ROUTES from '../constants/routes';

export const NotFoundPage = (props) =>
{
    return (
        <div className="row center">
            <div className="column center">
                <h1>Page not found!</h1>
                <LinkButton to={ROUTES.LANDING}>Go back to home</LinkButton>
            </div>
        </div>
    );
}