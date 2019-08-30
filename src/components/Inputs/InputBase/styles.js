export default ({ spacing, palette, shape }) => ({
    root: {
        width: '100%',
        height: '100%',
        border: '1px solid',
        borderColor: palette.grey[300],
        borderRadius: shape.borderRadius,
        paddingLeft: spacing.unit * 2,
        paddingRight: spacing.unit * 2,
        '&:hover': {
            borderColor: palette.grey[400]
        }
    },
    success: {
        borderColor: `${palette.success.primary} !important`, // Focus override
        '&:hover': {
            borderColor: `${palette.success.hover} !important` // Focus override
        }
    },
    error: {
        borderColor: `${palette.error.main} !important`, // Focus override
        '&:hover': {
            borderColor: `${palette.error.dark} !important` // Focus override
        }
    },
    input: {
        height: '100%',
        padding: 0,
        textOverflow: 'ellipsis'
    },
    focused: {
        borderColor: palette.grey[500],
        '&:hover': {
            borderColor: palette.grey[700]
        }
    },
    multiline: {
        display: 'flex',
        alignItems: 'flex-start',
        overflow: 'hidden',
        paddingTop: spacing.unit,
        paddingBottom: spacing.unit,
        paddingLeft: spacing.unit * 2,
        paddingRight: spacing.unit * 2
    },
    inputMultiline: {
        paddingRight: spacing.unit * 2
    },
    disabled: {
        display: 'flex',
        alignItems: 'center',

        backgroundColor: palette.grey[200],
        color: palette.grey[500],

        '&:hover': {
            borderColor: palette.grey[300]
        }
    },
    label: {
        color: `${palette.grey[800]} !important` // Overrides focused
    },
    container: {
        width: '100%'
    },
    adornment: {
        zIndex: 1
    }
});
