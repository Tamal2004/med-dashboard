export default ({ palette, spacing, typography }) => ({
    toolbar: {
        backgroundColor: palette.grey[100],
        border: '1px solid',
        borderLeft: 'unset',
        borderRight: 'unset',
        borderColor: palette.grey[300],
        marginLeft: spacing.unit * -2.5,
        marginRight: spacing.unit * -2.5
    },
    title: {
        fontWeight: typography.fontWeightHeavy
    }
});
