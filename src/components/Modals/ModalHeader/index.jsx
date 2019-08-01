import React from 'react';
import classNames from 'classnames';

// Material
import {
    withStyles,
    DialogTitle as MuiDialogTitle,
    Typography,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Local
import styles from './styles';

const ModalHeader = ({
    classes: { root, button },
    className = {},
    onClose,
    children,
}) => (
    <MuiDialogTitle disableTypography className={classNames(root, className)}>
        <Typography variant='h6'>{children}</Typography>
        {onClose && (
            <IconButton aria-label='Close' className={button} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        )}
    </MuiDialogTitle>
);

const _ModalHeader = withStyles(styles)(ModalHeader);

export { _ModalHeader as default, _ModalHeader as ModalHeader };
