export default ({ palette, spacing, typography }) => ({
    root: {
        border: '1px solid',
        borderColor: palette.grey[200],
        minWidth: spacing.unit * 55,
        height: spacing.unit * 63,
        marginBottom: spacing.unit * 3
    },
    footer: {
        width: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: spacing.unit * 3,
        right: 0
    },
    total: {
        fontWeight: typography.fontWeightHeavy
    }
});
