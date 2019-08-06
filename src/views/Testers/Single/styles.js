import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(4),
        width: '100%'
    },
    header: {
        height: spacing(60)
    }
}));
