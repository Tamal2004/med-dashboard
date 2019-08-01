const styles = ({ spacing }) => ({
    root: {
        display: 'block',
        minWidth: spacing.unit * 45,
        height: spacing.unitHeight,
        margin: 'auto',
        marginTop: spacing.unitHeight + spacing.unitPadding,
        marginBottom: spacing.unit * -4.5
    },
});

export { styles as default, styles };
