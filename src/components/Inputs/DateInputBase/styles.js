export default ({ spacing, palette, shape }) => ({
    container: {
        width: '100%'
    },
    root: {
        width: '100%',
        height: '100%',
        color: palette.grey[700],
        border: '1px solid',
        borderColor: palette.grey[300],
        borderRadius: shape.borderRadius,
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        '&:hover': {
            borderColor: palette.grey[400]
        },
        // InputBase
        '& > div': {
            height: 'inherit',
            color: 'inherit'
        }
    },
    input: {
        padding: 0
    },
    adornment: {
        color: palette.grey[400],
        '&:hover': {
            color: palette.grey[600]
        }
    },
    adornmentDisabled: {
        pointerEvents: 'none',
        cursor: 'none',
        color: palette.grey[500],
        '&:hover': {
            color: palette.grey[500]
        }
    },
    disabled: {
        backgroundColor: palette.grey[200],
        color: palette.grey[500],
        '&:hover': {
            borderColor: palette.grey[300]
        }
    },
    success: {
        borderColor: palette.success.primary,
        '&:hover': {
            borderColor: palette.success.hover
        }
    }
});
