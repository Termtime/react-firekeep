import React from 'react';
import { Button } from '@material-ui/core';

export const ContainerButton = (props) => {
    return (
        <div>
            <Button variant="contained" onClick={props.onClick}>{props.children}</Button>
        </div>
    );
}