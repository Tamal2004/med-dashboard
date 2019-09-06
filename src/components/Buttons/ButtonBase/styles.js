const styles = ({ shadows, palette }) => ({
    root: {
        boxShadow: shadows[0]
    },
    contained: {
        '&$disabled': {
            color: '#ffffff',
            backgroundColor: palette.grey[400]
        }
    },
    rootLoading: {
        animation: '$color_pulsate 1s infinite alternate'
    },
    '@keyframes color_pulsate': {
        from: { backgroundColor: '#ffcc80' },
        to: { backgroundColor: '#fff3e0' }
    },
    containedPrimary: {
        color: palette.common.offWhite
    },
    disabled: {}
});

export { styles as default, styles };
