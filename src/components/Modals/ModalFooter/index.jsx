import React from "react";
import classNames from 'classnames';

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
    <MuiDialogActions className={classNames(root, className)}>
        {children}
    </MuiDialogActions>
);

const _ModalFooter = withStyles(styles)(ModalFooter);

export { _ModalFooter as default, _ModalFooter as ModalFooter };