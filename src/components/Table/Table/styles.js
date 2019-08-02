import { hexToRgb } from 'libs';

export default ({ palette, spacing, transitions, typography }) => ({
    root: {},
    row: {
        height: spacing(4.5),
        maxHeight: spacing(4.5),

        position: 'relative',

        '&:nth-of-type(even)': {
            backgroundColor: palette.background.default
        },
        '&:hover': {
            backgroundColor: `${hexToRgb(
                palette.primary.main,
                palette.action.hoverOpacity
            )}`
        }
    },
    body: {},
    header: {
        backgroundColor: palette.grey[300],
        cursor: 'unset',
        '&:hover': {
            backgroundColor: palette.grey[300]
        }
    },
    cell: {
        paddingLeft: spacing(),
        paddingRight: spacing(),
        minWidth: spacing(10.5),
        maxWidth: spacing(31.5),
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    cellHeader: {
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
        transition: `transform ${transitions.duration.complex}ms ${transitions.easing.easeInOut}`
    },
    activeIcon: {
        fill: palette.common.black
    },
    reverseIcon: {
        transform: 'rotate(180deg)'
    },
    ripple: { color: 'yellow'}
});
