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
    memoRoot: {
        height: '100%'
    },
    scrollEnable: {
        overflowY: 'scroll'
    },
    inactiveRoot: {
        border: 'unset',
        pointerEvents: 'none'
    },
    inputMultiline: {
        overflow: 'hidden'
    }
}));
