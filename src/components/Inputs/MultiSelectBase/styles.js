import { makeStyles } from '@material-ui/core';

import { hexToRgb } from 'libs';

export default makeStyles(({ spacing, palette, shape, typography }) => {
    const menuItemsShown = 5;
    const menuItemHeight = spacing(4);
    const menuItemPadding = spacing();
    const menuHeight = (menuItemHeight + 2 * menuItemPadding) * menuItemsShown;
    return {
        control: {
            border: '1px solid',
            borderColor: palette.grey[300],
            borderRadius: shape.borderRadius,
            '&:hover': {
                borderColor: palette.grey[400]
            }
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
            marginLeft: 4,
            marginRight: 4,
            marginTop: spacing(-0.5),
            marginBottom: spacing(-0.625)
        },
        chip: {
            height: spacing(3),
            marginTop: spacing(0.25),
            marginBottom: spacing(0.25),
            width: '100%',
            borderRadius: shape.borderRadius,
            backgroundColor: `${hexToRgb(palette.secondary.main, 0.6)}`,
            color: palette.common.offWhite,
            fontWeight: typography.fontWeightHeavy
        },
        menu: {
            maxHeight: menuHeight,
            maxWidth: 0,
            borderTopLeftRadius: 'unset',
            borderTopRightRadius: 'unset'
        },
        menuItem: {
            '& > li': {
                height: menuItemHeight,
                width: '100%',
                lineHeight: `${menuItemHeight}px`,
                textOverflow: 'ellipsis',
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                paddingTop: menuItemPadding,
                paddingBottom: menuItemPadding
            }
        },
        menuText: {
            lineHeight: `${menuItemHeight}px`,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        select: {
            '&:focus': {
                backgroundColor: 'unset'
            }
        },
        success: {
            borderColor: `${palette.success.primary} !important`, // Focus override
            '&:hover': {
                borderColor: `${palette.success.hover} !important` // Focus override
            }
        },
        icon: { marginRight: spacing(0.5), transform: 'scale(1.2)' }
    };
});
