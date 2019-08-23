import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { SnackbarContainer } from './Container';

const SuccessNotification = ({ message }) => {
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
                variant='success'
                message={message}
            />
        </Snackbar>
    );
};

export { SuccessNotification as default, SuccessNotification };
