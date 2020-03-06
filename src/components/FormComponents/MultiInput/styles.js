import { makeStyles } from '@material-ui/core';

export default makeStyles(({ spacing, typography }) => ({
    root: {
        height: spacing(18),
        padding: 0,
        paddingLeft: spacing(2)
    },
    cardRoot: {
        paddingTop: spacing(),
        paddingBottom: spacing(),
        paddingRight: spacing(2),
        height: '100%',
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
        paddingTop: spacing(),
        paddingBottom: spacing(),
        overflowY: 'scroll'
    },
    cardInputMultiline: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));
