import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';

const styles = ({ spacing }) => ({
    root: {
        width: spacing(3),
        height: spacing(3)
    }
});

const CheckboxBlankIcon = ({
    classes: { root },
    className,
    color = '#373A3F'
}) => (
    <svg
        className={classNames(root, className)}
        x='0px'
        y='0px'
        viewBox='0 0 19 18'
    >
        <path
            style={{
                fill: '#FFFFFF',
                fillOpacity: 0,
                stroke: color,
                strokeLinejoin: 'round'
            }}
            d='M6,3h7c1.7,0,3,1.3,3,3v6c0,1.7-1.3,3-3,3H6c-1.7,0-3-1.3-3-3V6C3,4.3,4.3,3,6,3z'
        />
    </svg>
);

const _CheckboxBlankIcon = withStyles(styles)(CheckboxBlankIcon);

export {
    _CheckboxBlankIcon as default,
    _CheckboxBlankIcon as CheckboxBlankIcon
};
