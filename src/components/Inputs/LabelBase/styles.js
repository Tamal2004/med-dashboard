export default ({ spacing, palette }) => ({
    root: {
        paddingTop: spacing.unitPadding,
        paddingBottom: spacing.unitPadding,
        height: spacing.unitPadding * 3,
        color: palette.grey[800]
    },
    focused: {
        color: `${palette.grey[800]} !important`
    },
    disabled: {
        color: palette.grey[400]
    },
    icon: {
        position: 'absolute',
        transform: `translateX(${spacing.unit(4)}px)`,
        height: spacing.unit(1.5)
    }
});
