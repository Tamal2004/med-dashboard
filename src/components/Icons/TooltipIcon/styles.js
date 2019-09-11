export default ({ palette, spacing }) => ({
    icon: {
        '&:hover': {
            backgroundColor: palette.action.hover
        },
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'unset',
        paddingLeft: spacing(),
        paddingRight: spacing(),
        height: '100%'
    },
    container: {
        height: 'inherit'
    },
    disabledStyle: {
        color: palette.action.disabled
    }
});
