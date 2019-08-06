export default ({ palette, spacing, transitions, typography }) => ({
    root: {
        borderTop: '1px solid #eeeeee'
    },
    row: {
        position: 'relative',
        '&:hover': {
            backgroundColor: palette.background.default
        }
    },
    body: {},
    header: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: palette.grey[50]
        }
    },
    cell: {
        padding: `${spacing(2)}px ${spacing()}px`,
        minWidth: spacing(10.5),
        maxWidth: spacing(31.5),
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderColor: '#eeeeee'
    },
    cellHeader: {
        borderColor: '#eeeeee',
        color: palette.text.primary,
        fontWeight: typography.fontWeightHeavy,
        fontSize: typography.button.fontSize,
        position: 'relative',
        paddingRight: spacing(3),
        '&:last-child': {
            paddingRight: spacing(3.5),
            '& > svg': {
                right: spacing(0.5)
            }
        }
    },
    icon: {
        fill: palette.action.disabled,
        position: 'absolute',
        height: '100%',
        top: 0,
        right: 0,
        cursor: 'pointer',
        marginRight: 15,
        transition: `transform ${transitions.duration.complex}ms ${transitions.easing.easeInOut}`
    },
    activeIcon: {
        fill: palette.common.black
    },
    reverseIcon: {
        transform: 'rotate(180deg)'
    },
    ripple: { color: 'yellow' }
});
