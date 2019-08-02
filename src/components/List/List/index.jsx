import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import styles from './styles';

const _List = props => {
    const { classes, children, disablePadding, ...restProps } = props;

    return (
        <List disablePadding={disablePadding} {...restProps}>
            {children}
        </List>
    );
};

_List.propTypes = {
    disablePadding: false
};

_List.propTypes = {
    classes: PropTypes.object,
    disablePadding: PropTypes.bool
};

const __List = withStyles(styles)(_List);

export { __List as default, __List as List };
