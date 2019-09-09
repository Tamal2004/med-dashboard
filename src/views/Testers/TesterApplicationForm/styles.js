import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, typography, breakpoints }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(4),
        textAlign: 'justify',
        width: 'auto',
        [breakpoints.down('sm')]: {
            margin: 0,
            textAlign: 'left',
            padding: spacing()
        }
    },
    noauthRoot: {
        margin: 0
    },
    header: {
        fontWeight: 700,
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4),
        [breakpoints.down('xs')]: {
            paddingBottom: 0
        }
    },
    noTesterHeader: {
        paddingBottom: '0px'
    },
    noTesterCard: {
        paddingTop: 0
    },
    info: {
        padding: spacing(3),
        paddingBottom: 0
    },
    footer: {
        padding: spacing(3),
        [breakpoints.down('xs')]: {
            padding: spacing(2)
        }
    },
    submit: {
        width: `calc(100% - ${spacing(6)}px)`,
        height: spacing(6),
        marginLeft: spacing(3),
        marginRight: spacing(3),
        [breakpoints.down('xs')]: {
            marginTop: spacing(2)
        }
    },
    checkboxTypography: {
        [breakpoints.down('xs')]: {
            textAlign: 'left',
            paddingLeft: 10
        }
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
