export default ({ palette, spacing }) => ({
    container: {
        borderLeft: '1px solid',
        borderColor: palette.grey[400],
        height: '100%',
        paddingLeft: spacing.unit,
        paddingRight: spacing.unit / 2
    },
    select: {
        '&:focus': {
            backgroundColor: 'unset'
        }
    },
    paper: {
        transform: `translateX(${spacing.unit / 2}px) !important`,
        '& > ul': {
            padding: 0
        }
    }
});
