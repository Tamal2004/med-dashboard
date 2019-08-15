import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, typography }) => ({
    root: {
        height: spacing(6)
    },
    cardRoot: {
        height: spacing(4),
        fontSize: typography['subtitle2'].fontSize
    },
    inactiveRoot: {
        border: 'unset',
        pointerEvents: 'none'
    }
}));
