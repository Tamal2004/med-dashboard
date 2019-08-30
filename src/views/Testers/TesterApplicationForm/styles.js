import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, typography }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(4),
        textAlign: 'justify',
        width: 'auto'
    },
    noauthRoot: {
        margin: 0
    },
    header: {
        fontWeight: 700,
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4)
    },
    info: {
        padding: spacing(3),
        paddingBottom: 0
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
    manualGrid: {
        textAlign: 'right',
        padding: spacing(2)
    },
    manualLink: {
        paddingLeft: spacing(2),
        fontSize: typography.subtitle1.fontSize
    }
}));
