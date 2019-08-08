import React from 'react';
import clsx from 'clsx';

// Material
import {
    withStyles,
    DialogTitle as MuiDialogTitle,
    Typography,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Local
import styles from './styles';

const ModalHeader = ({ classes: c, className = {}, onClose, children }) => (
    <MuiDialogTitle disableTypography className={clsx(c.root, className)}>
        <Typography variant='h6' className={c.title}>
            {children}
        </Typography>
        {onClose && (
            <IconButton
                aria-label='Close'
                className={c.button}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
        )}
    </MuiDialogTitle>
);

const _ModalHeader = withStyles(styles)(ModalHeader);

export { _ModalHeader as default, _ModalHeader as ModalHeader };
