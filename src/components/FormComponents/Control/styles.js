import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    root: {
        marginTop: spacing(3),
        marginBottom: spacing(3)
    },
    cardRoot: {
        margin: 0
    },
    left: {
        paddingRight: spacing(4),
        paddingLeft: spacing(2)
    },
    right: {
        paddingRight: spacing(2),
        paddingLeft: spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    label: {
        height: spacing(6),
        display: 'flex',
        alignItems: 'center'
    },
    labelText: { color: palette.text.primary },
    memo: { color: palette.text.hint },
    cardLabel: {
        height: spacing(5)
    }
}));
