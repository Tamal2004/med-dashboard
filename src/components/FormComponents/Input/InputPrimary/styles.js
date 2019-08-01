export default ({ palette, spacing }) => ({
    root: {
        height: spacing.unitHeight,
    },
    container: {
        paddingBottom: spacing.unitPadding
    },
    amendRoot: {
        backgroundColor: palette.amend.main
    },
    amendDisabled: {
        backgroundColor: palette.amend.dark
    },
});
