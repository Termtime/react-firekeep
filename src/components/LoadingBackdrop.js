import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

export const LoadingBackdrop = (props) => {
    return(
        <Backdrop open={props.open}>
        <div className="flex-container row center"> 
            <div className="flex-container column center">
                <CircularProgress color="secondary" />
            </div> 
        </div>
        </Backdrop>
    );
}