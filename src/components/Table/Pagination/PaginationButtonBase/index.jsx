import React, { Component } from 'react';
import clsx from 'clsx';

// Material
import { withStyles, IconButton } from '@material-ui/core';

// Local
import styles from './styles';
import { composeClasses } from 'libs';

class PaginationButtonBase extends Component {
    render() {
        const {
            classes,
            styles,
            className,
            active,
            children,
            edge,
            ...restProps
        } = this.props;

        const { root, edgeEnd, ripple, ...c } = composeClasses({
            classes,
            styles
        });

        return (
            <IconButton
                classes={{
                    root: clsx(root, edge === 'end' && edgeEnd, className),
                    ...c
                }}
                centerRipple={false}
                TouchRippleProps={{ classes: { child: ripple } }}
                color={active ? 'primary' : 'secondary'}
                variant='contained'
                {...restProps}
            >
                {children}
            </IconButton>
        );
    }
}

const _PaginationButtonBase = withStyles(styles)(PaginationButtonBase);

export {
    _PaginationButtonBase as default,
    _PaginationButtonBase as PaginationButtonBase
};
