import { hexToRgb } from 'helpers';

export default ({ palette, spacing, transitions, typography }) => ({
    root: {},
    row: {
        height: spacing.unit * 4.5,
        maxHeight: spacing.unit * 4.5,
        cursor: 'pointer',

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
    highlight: {
        backgroundColor: 'yellow'
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
        paddingLeft: spacing.unit,
        paddingRight: spacing.unit,
        minWidth: spacing.unit * 10.5,
        maxWidth: spacing.unit * 31.5,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    cellHeader: {
        color: palette.text.primary,
        fontWeight: typography.fontWeightHeavy,
        fontSize: typography.button.fontSize,
        position: 'relative',
        paddingRight: spacing.unit * 3,
        '&:last-child': {
            paddingRight: spacing.unit * 3.5,
            '& > svg': {
                right: spacing.unit / 2
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
