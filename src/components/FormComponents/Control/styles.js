import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    root: {
        marginTop: spacing(3),
        marginBottom: spacing(3)
    },
    left: {
        paddingRight: spacing(4),
        paddingLeft: spacing(2)
    },
    right: {
        paddingRight: spacing(2),
        paddingLeft: spacing(4)
    },
    label: {
        height: spacing(6),
        display: 'flex',
        alignItems: 'center'
    }
}));
