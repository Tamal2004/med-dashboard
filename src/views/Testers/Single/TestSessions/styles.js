import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    container: {
        marginBottom: 32,
        backgroundColor: 'unset'
    },
    anchorStyle: {
        textDecoration: 'none',
        color: palette.primary.main
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
