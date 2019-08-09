import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, typography }) => ({
    root: {
        marginTop: spacing(4),
        paddingTop: spacing(2),
        paddingBottom: spacing(2),
        width: '100%'
    },
    header: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        marginBottom: spacing()
    },
    title: {
        marginLeft: spacing(2),
        fontWeight: typography.fontWeightHeavy
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    content: {
        padding: spacing(2)
    }
}));
