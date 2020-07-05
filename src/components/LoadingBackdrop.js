import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const LoadingBackdrop = (props) => {
    return(
        <div className="flex-container row center"> 
            <div className="flex-container column center">
                <CircularProgress color="secondary" />
            </div> 
        </div>
    );
}