import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(4),
        width: '100%'
    },
    header: {
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4)
    },
    info: {
        padding: spacing(4),
        paddingBottom: 0
    }
}));
