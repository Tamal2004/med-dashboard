import React from "react";
import classNames from 'classnames';

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
    <MuiDialogContent className={classNames(root, className)}>
        {children}
    </MuiDialogContent>
);

const _ModalContent = withStyles(styles)(ModalContent);

export { _ModalContent as default, _ModalContent as ModalContent };