import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, typography }) => ({
    root: {
        height: spacing(18)
    },
    cardRoot: {
        height: spacing(12),
        fontSize: typography['subtitle2'].fontSize,
        marginTop: spacing(0.5),
        marginBottom: spacing(0.5)
    },
    inactiveRoot: {
        border: 'unset',
        pointerEvents: 'none'
    }
}));
