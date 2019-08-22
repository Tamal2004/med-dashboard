import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, shadows }) => ({
    root: {
        margin: spacing(4),
        boxShadow: shadows[1],
        padding: spacing(4)
    },
    header: {
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4)
    }
}));
