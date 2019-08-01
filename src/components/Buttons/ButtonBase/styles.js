const styles = ({ shadows, palette }) => ({
    root: {
        boxShadow: shadows[0],
        color: palette.common.white,
        backgroundColor: palette.primary.main
    },
    contained: {
        '&$disabled': {
            color: '#ffffff',
            backgroundColor: '#96baf5'
        }
    },
    disabled: {}
});

export { styles as default, styles };
