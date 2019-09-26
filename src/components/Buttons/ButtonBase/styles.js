const styles = ({ shadows, shape, palette }) => ({
    container: {
        position: 'relative'
    },
    root: {
        boxShadow: shadows[0]
    },
    contained: {
        '&$disabled': {
            color: '#ffffff',
            backgroundColor: palette.grey[400]
        }
    },
    label: {
        textTransform: 'none'
    },
    containedPrimary: {
        color: palette.common.offWhite
    },
    disabled: {},
    loader: {
        position: 'absolute',
        width: '100%',
        borderBottomLeftRadius: shape.borderRadius,
        borderBottomRightRadius: shape.borderRadius
    }
});

export { styles as default, styles };
