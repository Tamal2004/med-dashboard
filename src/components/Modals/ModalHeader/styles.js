export default ({ palette, spacing, typography }) => ({
    root: {
        backgroundColor: '#f4f4f4',
        margin: 0,
        padding: spacing(2),
        paddingLeft: spacing(5),
        paddingRight: spacing(5),
        borderTopLeftRadius: spacing(2),
        borderTopRightRadius: spacing(2)
    },
    button: {
        position: 'absolute',
        top: spacing(),
        right: spacing(),
        color: palette.grey[500]
    },
    title: {
        fontWeight: typography.fontWeightHeavy
    }
});
