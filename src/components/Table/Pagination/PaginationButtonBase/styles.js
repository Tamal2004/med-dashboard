import { hexToRgb } from 'libs';

export default ({ palette, spacing, typography }) => ({
    root: {
        width: spacing(4),
        height: spacing.unit * 4,
        minWidth: 'unset',
        minHeight: 'unset',
        padding: spacing.unit,
        border: '1px solid',
        borderLeft: 'unset',
        borderColor: palette.grey[400],
        borderRadius: 'unset',

        color: palette.action.active,

        '&$disabled': {
            backgroundColor: palette.action.disabledBackground,
            backgroundImage: 'unset',
            color: palette.action.disabled,
            fill: palette.action.disabled
        }
    },
    /* When active */
    colorPrimary: {
        backgroundColor: palette.action.selected,
        '&:hover': {
            backgroundColor: palette.action.hover
        }
    },
    /* Default */
    colorSecondary: {
        backgroundImage: `linear-gradient(${hexToRgb(
            palette.grey[50]
        )}, ${hexToRgb(palette.grey[200])})`,
        '&:hover': {
            backgroundImage: `linear-gradient(${hexToRgb(
                palette.grey[100]
            )}, ${hexToRgb(palette.grey[300])})`
        }
    },
    /* Number || Icon */
    label: {
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeightMedium,
        color: palette.text.primary,
        fill: 'inherit'
    },
    /* Psuedo-Selector declaration */
    disabled: {},
    /* Exists in V4, but not V3*/
    edgeEnd: {
        borderRight: 'unset'
    },
    /* TouchRipple - Child */
    ripple: {
        borderRadius: 'unset'
    }
});
