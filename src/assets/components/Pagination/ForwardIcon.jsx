import React from 'react';
import clsx from 'classnames';

// Material
import { withStyles } from '@material-ui/core';

const styles = ({ spacing, palette, typography }) => ({
    root: {
        width: typography.fontSize,
        height: typography.fontSize,
        marginLeft: spacing.unit() / 4,
        fill: 'inherit'
    },
    polygon: {
        fill: 'inherit'
    }
});

const ForwardIcon = ({ classes: c, className }) => {
    return (
        <svg className={clsx(c.root, className)} viewBox='0 0 26 26'>
            <g>
                <polygon
                    className={c.polygon}
                    points='2.049,0.58 -0.035,2.664 10.801,13.5 -0.035,24.336 2.049,26.42 14.969,13.5  '
                />
                <polygon
                    className={c.polygon}
                    points='13.049,0.58 10.965,2.664 21.801,13.5 10.965,24.336 13.049,26.42 25.969,13.5  '
                />
            </g>
        </svg>
    );
};

const _ForwardIcon = withStyles(styles)(ForwardIcon);

export { _ForwardIcon as default, _ForwardIcon as ForwardIcon };
