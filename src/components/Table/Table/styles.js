export default ({ palette, spacing, transitions, typography }) => ({
    root: {
        borderTop: '1px solid',
        borderColor: palette.grey[200]
    },
    nullRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid',
        borderColor: palette.grey[200],
        width: '100%',
        height: spacing(6),
        backgroundColor: palette.grey[50],
        marginTop: spacing(3)
    },
    action: {
        cursor: 'pointer'
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
    titleWrapper: {
        overflow: 'hidden',
        display: 'inline-block',
        margin: '0 5px 0 5px',
        maxWidth: 'inherit',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    cell: {
        padding: `${spacing(2)}px ${spacing(2)}px ${spacing(
            2
        )}px ${spacing()}px`,
        // minWidth: spacing(10.5),
        maxWidth: 188,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderColor: '#eeeeee'
    },
    cellHeader: {
        borderColor: '#eeeeee',
        color: palette.text.primary,
        backgroundColor: palette.grey[50],
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
    actionCellHeader: {
        backgroundColor: palette.grey[50],
        textAlign: 'right',
        paddingRight: '21px !important',
        // minWidth: 'unset !important',
        width: spacing()
    },
    ripple: { color: 'yellow' }
});
