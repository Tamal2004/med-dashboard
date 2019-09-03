import { makeStyles } from '@material-ui/core';

export default makeStyles(({ breakpoints, palette, spacing }) => ({
    root: {
        marginTop: spacing(3),
        marginBottom: spacing(3)
    },
    cardRoot: {
        margin: 0
    },
    left: {
        paddingRight: spacing(4),
        paddingLeft: spacing(2),
        [breakpoints.down('xs')]: {
            paddingRight: spacing(2)
        }
    },
    right: {
        paddingRight: spacing(2),
        paddingLeft: spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [breakpoints.down('xs')]: {
            paddingLeft: spacing(2)
        }
    },
    noLabelRight: {
        paddingLeft: spacing(2)
    },
    label: {
        height: spacing(6),
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left'
    },
    labelText: { color: palette.text.primary },
    memo: { color: palette.text.hint },
    cardLabel: {
        height: spacing(5)
    },
    required: {
        color: 'red',
        fontSize: 13,
        marginLeft: 10
    }
}));
