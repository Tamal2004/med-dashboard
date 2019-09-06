export default ({ palette }) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        height: 'inherit',
        zIndex: 2,
        cursor: 'pointer'
    },
    icon: {
        color: palette.grey[500],
        '&:hover': {
            color: palette.grey[700]
        },
        transform: 'scale(1.3)'
    },
    disabled: {
        zIndex: 'unset'
    }
});
