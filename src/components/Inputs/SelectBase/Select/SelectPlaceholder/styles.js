export default ({ spacing, palette }) => ({
    placeholder: {
        color: palette.grey[400],
        fontSize: 'inherit',
        position: 'absolute',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingRight: spacing.unit * 4,
        textOverflow: 'ellipsis',
        height: 'inherit',
        paddingLeft: spacing.unit * 2
    },
    focused: {
        display: 'none !important'
    }
});
