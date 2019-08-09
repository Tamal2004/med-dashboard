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
    containedPrimary: {},
    disabled: {}
});

export { styles as default, styles };
