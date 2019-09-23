import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(4),
        textAlign: 'justify',
        width: 'auto'
    },
    header: {
        textAlign: 'center',
        fontWeight: 700,
        paddingTop: spacing(2),
        paddingBottom: spacing(4)
    },
    footer: {
        padding: spacing(3)
    },
    submit: {
        width: `calc(100% - ${spacing(6)}px)`,
        height: spacing(6),
        marginLeft: spacing(3),
        marginRight: spacing(3)
    },
}));
