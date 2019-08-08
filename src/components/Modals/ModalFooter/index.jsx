import React from "react";
import clsx from 'clsx';

// Material
import {
    withStyles,
    DialogActions as MuiDialogActions
} from "@material-ui/core";

// Local
import styles from './styles';


const ModalFooter = ({
    classes: { root },
    className = {},
    children
}) => (
    <MuiDialogActions className={clsx(root, className)}>
        {children}
    </MuiDialogActions>
);

const _ModalFooter = withStyles(styles)(ModalFooter);

export { _ModalFooter as default, _ModalFooter as ModalFooter };