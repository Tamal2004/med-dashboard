export default ({ spacing }) => ({
    root: {
        width: spacing.unit * 1.5,
        height: spacing.unit * 1.5,
        marginTop: spacing.unit / 2,
        marginLeft: spacing.unit * 1.5,
        cursor: 'pointer',
        opacity: 0.5,
        '&:hover': {
            opacity: 1
        }
    }
});
