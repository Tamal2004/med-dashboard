import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { SnackbarContainer } from './Container';

const ErrorNotification = ({ message }) => {
    const [open, setOpen] = useState(true);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <SnackbarContainer
                onClose={handleClose}
                variant='error'
                message={message}
            />
        </Snackbar>
    );
};

export { ErrorNotification as default, ErrorNotification };
