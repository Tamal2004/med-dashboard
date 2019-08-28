import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, breakpoints }) => ({
    root: {
        width: breakpoints.values.sm,
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
    },
    footer: {
        padding: spacing(4),
        paddingBottom: spacing(2),
        paddingTop: spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
