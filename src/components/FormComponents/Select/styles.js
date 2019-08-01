export default ({ palette, spacing }) => ({
    container: {
        paddingBottom: spacing.unitPadding
    },
    control: {
        height: spacing.unitHeight,
        width: '100%'
    },
    cancellableRoot: {
        right: spacing.unit * 5.5
    },
    dropdownRoot: {
        '&:before': {
            content: '""',
            backgroundColor: palette.grey[500],
            width: 2,
            height: '70%',
            position: 'absolute',
            marginLeft: -spacing.unit // Either fatten the width or move this
        }
    },
    placeholder: {
        paddingRight: spacing.unit * 6
    },
    amendControl: {
        backgroundColor: palette.amend.main
    },
    amendDisabled: {
        backgroundColor: `${palette.amend.dark} !important`
    },
    amendPlaceholder: {
        color: palette.text.secondary
    }
});
