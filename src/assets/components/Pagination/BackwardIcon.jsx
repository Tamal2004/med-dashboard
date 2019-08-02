import React from 'react';
import clsx from 'clsx';

// Material
import { withStyles } from '@material-ui/core';

// Local
import ForwardIcon from './ForwardIcon';

const styles = ({ spacing }) => ({
    root: {
        transform: 'rotate(180deg)',
        marginLeft: spacing.unit / 4,
        fill: 'inherit',
    }
});

const BackwardIcon = ({ classes: c, className }) => (
    <ForwardIcon className={clsx(c.root, className)} />
);

const _BackwardIcon = withStyles(styles)(BackwardIcon);

export { _BackwardIcon as default, _BackwardIcon as BackwardIcon };
