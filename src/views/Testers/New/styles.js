import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, shadows }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(8)
    },
    header: {
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4)
    },
    info: {
        paddingTop: spacing(4)
    },
    contact: {
        boxShadow: shadows[6],
        padding: spacing(4)
    }
}));
