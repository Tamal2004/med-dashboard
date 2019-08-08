import React from "react";
import clsx from 'clsx';

// Material
import {
    withStyles,
    DialogContent as MuiDialogContent,
} from "@material-ui/core";

// Local
import styles from './styles';


const ModalContent = ({
    classes: { root },
    className = {},
    children
}) => (
    <MuiDialogContent className={clsx(root, className)}>
        {children}
    </MuiDialogContent>
);

const _ModalContent = withStyles(styles)(ModalContent);

export { _ModalContent as default, _ModalContent as ModalContent };