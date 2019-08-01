import React from 'react';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

// Local
import styles from './styles';
import { Icon } from 'components/Icons';


/*
 * Domain: --
 * Page: Select
 * Component: Dropdown
 * Type: Icon
 * SelectDropdownIcon
 */
const SelectDropdownIcon = ({
    classes: { root, icon, disabled: disabledStyle },
    styles,
    disabled,
    ...restProps
}) => (
    <Icon className={classNames(root, disabled && disabledStyle, styles.dropdownRoot)} {...restProps}>
        <DropdownIcon className={classNames(icon, styles.dropdownIcon)} />
    </Icon>
);

const _SelectDropdownIcon = withStyles(styles)(SelectDropdownIcon);

export {
    _SelectDropdownIcon as default,
    _SelectDropdownIcon as SelectDropdownIcon,
};
