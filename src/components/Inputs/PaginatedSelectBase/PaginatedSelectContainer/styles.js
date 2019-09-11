export default ({ palette, spacing, typography }) => ({
    root: {
        border: '1px solid',
        borderColor: palette.grey[200],
        minWidth: spacing(55),
        height: spacing(63),
        marginBottom: spacing(3)
    },
    footer: {
        width: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: spacing(3),
        right: 0
    },
    total: {
        fontWeight: typography.fontWeightHeavy
    }
});
