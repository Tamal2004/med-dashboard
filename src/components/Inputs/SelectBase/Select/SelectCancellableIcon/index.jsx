import React from 'react';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Local
import styles from './styles';
import { Icon } from 'components/Icons';


/*
 * Domain: --
 * Page: Select
 * Component: Cancellable
 * Type: Icon
 * SelectCancellableIcon
 */
const SelectCancellableIcon = ({ classes: { root, icon }, styles, onClick }) => (
    <Icon
        className={classNames(root, styles.cancellableRoot)}
        onClick={onClick}
    >
        <CloseIcon className={classNames(icon, styles.cancellableIcon)} />
    </Icon>
);

const _SelectCancellableIcon = withStyles(styles)(SelectCancellableIcon);

export { _SelectCancellableIcon as default, _SelectCancellableIcon as SelectCancellableIcon };
