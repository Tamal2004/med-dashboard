export default ({ palette, shadows, spacing }) => ({
    root: {
        boxShadow: shadows[0],
        margin: 0,
        padding: spacing.unit,
        height: spacing.unit * 7
    },
    spotlight: {
        border: '1px solid',
        borderRadius: 4,
        borderColor: palette.grey[400],
        height: '100%'
    },
    input: {
        height: '100%',
        paddingLeft: spacing.unit,
        paddingRight: spacing.unit
    },
    adornment: {
        color: palette.grey[500]
    },

    buttonContainer: { paddingLeft: spacing.unit },
    button: {
        width: '100%',
        height: '100%',
        lineHeight: 1.5,
        color: palette.primary.main,
        textTransform: 'none'
    }
});
