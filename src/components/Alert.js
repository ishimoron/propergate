import React, {Fragment, useState} from 'react';
import {Collapse, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const Alert = ({error}) => {

    const [open, setOpen] = useState(true)

    return (
        <Fragment>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    {error}
                </Alert>
            </Collapse>
        </Fragment>
    );
};

export default Alert;