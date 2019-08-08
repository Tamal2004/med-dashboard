const styles = ({ palette, spacing }) => ({
    root: {
        display: 'block',
        minWidth: spacing(2),
        fontWeight: 700,
        textTransform: 'none'
    },
    containedPrimary: {
        color: palette.common.offWhite
    }
});

export { styles as default, styles };
