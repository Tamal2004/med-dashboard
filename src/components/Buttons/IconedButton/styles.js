import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    root: {
        textTransform: 'none',
        minWidth: spacing(20)
    },
    icon: {
        marginRight: spacing(0.5)
    }
}));
