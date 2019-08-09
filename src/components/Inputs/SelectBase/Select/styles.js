export default ({ unitHeight, unitWidth, listMaxNumber, iconRight }) => ({
    spacing,
    palette,
    shape
}) => {
    const menuItemHeight = unitHeight / 2;
    const listItemNumber = listMaxNumber;

    const menuItemPadding = menuItemHeight / 2;
    const listItemHeight = menuItemHeight * 2;
    const listHeight = listItemHeight * listItemNumber;

    // Padding = 2 + 2 ------ ScrollBar = 3 |||| spacing.units
    const listItemWidth = unitWidth - spacing(7);

    return {
        root: {
            display: 'flex',
            fontSize: 'inherit',
            alignItems: 'center',
            paddingRight: spacing(),
            height: 'inherit',
            color: palette.grey[700],
            '&:hover': {
                color: palette.text.primary
            }
        },
        select: {
            display: 'inline-block',
            lineHeight: `${menuItemHeight * 2}px`,
            marginRight: spacing(-4),
            width: '100%',
            height: 'inherit',
            paddingLeft: spacing(2),
            paddingTop: 0,
            paddingBottom: 0,
            '&:hover': {
                border: '1px solid',
                borderColor: palette.primary.main,
                borderRadius: shape.borderRadius
            }
        },
        selectCancellable: {
            paddingRight: Number(iconRight) + spacing(3) // Icon margin + font size
        },
        icon: {
            position: 'relative',
            top: 0
        },
        list: {
            marginTop: menuItemHeight * 2 + 2,
            maxHeight: listHeight,
            maxWidth: 0,
            borderTopLeftRadius: 'unset',
            borderTopRightRadius: 'unset'
        },
        listItem: {
            '& > li': {
                height: menuItemHeight,
                //width: listItemWidth,
                width: `calc(100% - ${spacing(4)}px)`,
                //width: 'calc(100% - 32px);',
                lineHeight: `${menuItemHeight}px`,
                textOverflow: 'ellipsis',
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                paddingTop: menuItemPadding,
                paddingBottom: menuItemPadding
            }
        },
        placeholder: {
            lineHeight: `${menuItemHeight * 2}px`,
            width: unitWidth
        },

        inputRoot: {
            width: '100%',
            position: 'absolute',
            fontSize: 'inherit',
            //left: Number(unitWidth) + spacing.unit,
            // InputBase
            '& > div': {
                fontSize: 'inherit',
                height: 'inherit',

                '&:before': {
                    display: 'none'
                },
                '&::after': {
                    display: 'none'
                }
            }
        },

        input: {
            height: 'inherit',
            paddingLeft: spacing(2),
            paddingRight: Number(iconRight) + spacing(3),
            paddingTop: 0,
            paddingBottom: 0,
            zIndex: 1
        },

        modal: {
            width: 0
        },
        selectQuery: {
            color: palette.common.transparent
        },
        placeholderQuery: {
            display: 'none'
        },
        control: {
            width: unitWidth ? null : '100%',
            height: unitHeight ? null : '100%',
            border: '1px solid',
            borderColor: palette.grey[300],
            borderRadius: shape.borderRadius,
            // InputBase
            '& > div': {
                marginTop: 0,
                fontSize: 'inherit',
                height: 'inherit'
            },
            '&:hover': {
                borderColor: palette.grey[400]
            }
        },

        success: {
            borderColor: `${palette.success.primary} !important`, // Focus override
            '&:hover': {
                borderColor: `${palette.success.hover} !important` // Focus override
            }
        },
        disabled: {
            backgroundColor: palette.grey[100],
            color: palette.grey[500],
            '&:hover': {
                borderColor: palette.grey[300]
            }
        },
        container: {
            position: 'unset',
            width: '100%'
        }
    };
};
