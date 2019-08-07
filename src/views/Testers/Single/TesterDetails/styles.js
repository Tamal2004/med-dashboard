import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    container: {
        marginBottom: 32,
        backgroundColor: 'unset'
    },
    root: {
        margin: spacing(4),
        padding: spacing(4),
        width: '100%'
    },
    name: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
    },
    divider: {
        margin: spacing(),
        marginLeft: spacing(2),
        marginRight: spacing(2)
    },
    footer: {
        padding: spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
