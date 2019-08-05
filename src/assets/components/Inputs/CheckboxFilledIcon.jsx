import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';

const styles = ({ spacing }) => ({
    root: {
        width: spacing.unit * 3,
        height: spacing.unit * 3
    }
});

const CheckboxFilledIcon = ({
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
        <path
            style={{
                fill: color
            }}
            d='M11,12.6H8c-1.4,0-2.6-1.2-2.6-2.6V8c0-1.5,1.1-2.6,2.6-2.6h3c1.4,0,2.6,1.2,2.6,2.6v2.1 C13.6,11.5,12.5,12.6,11,12.6z'
        />
    </svg>
);

const _CheckBoxFilledIcon = withStyles(styles)(CheckboxFilledIcon);

export {
    _CheckBoxFilledIcon as default,
    _CheckBoxFilledIcon as CheckboxFilledIcon
};
