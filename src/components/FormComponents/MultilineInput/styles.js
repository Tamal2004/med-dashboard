export default ({ palette, spacing }) => ({
    root: {
        height: (spacing.unitHeight * 2 ) + spacing.unitPadding * 4
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
