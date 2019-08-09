export default ({ spacing }) => ({
    root: {
        width: spacing(1.5),
        height: spacing(1.5),
        marginTop: spacing(2),
        marginLeft: spacing(1.5),
        cursor: 'pointer',
        opacity: 0.5,
        '&:hover': {
            opacity: 1
        }
    }
});
