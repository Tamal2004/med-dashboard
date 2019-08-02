import React from 'react';

// Matecial
import { withStyles } from '@material-ui/core';
import { Dialog } from '@material-ui/core';

// Local
import styles from './styles';

const ModalContainer = ({
    classes: { paper },
    onModalClose,
    isModalOpen,
    children,
    ...restProps
}) => {
    return (
        <Dialog
            maxWidth='md'
            onClose={onModalClose}
            open={isModalOpen}
            classes={{ paper }}
            {...restProps}
        >
            {children}
        </Dialog>
    );
};

const _ModalContainer = withStyles(styles)(ModalContainer);

export { _ModalContainer as default, _ModalContainer as ModalContainer };
