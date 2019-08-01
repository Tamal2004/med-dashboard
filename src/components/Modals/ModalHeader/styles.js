export default ({ palette, spacing }) => ({
    root: {
        backgroundColor: '#f4f4f4',
        margin: 0,
        padding: spacing.unit * 2,
        paddingLeft: spacing.unit * 5,
        paddingRight: spacing.unit * 5,
        borderTopLeftRadius: spacing.unit / 2,
        borderTopRightRadius: spacing.unit / 2
    },
    button: {
        position: 'absolute',
        top: spacing.unit,
        right: spacing.unit,
        color: palette.grey[500],
    },
});