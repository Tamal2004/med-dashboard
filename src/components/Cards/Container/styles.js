import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, shadows, breakpoints }) => ({
    root: {
        margin: spacing(4),
        boxShadow: shadows[1],
        padding: spacing(4),
        [breakpoints.down('xs')]: {
            margin: 0,
            padding: spacing()
        }
    },
    header: {
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4),
        [breakpoints.down('xs')]: {
            paddingBottom: spacing()
        }
    }
}));
