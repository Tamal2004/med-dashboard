import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, typography }) => ({
    control: {
        height: spacing(6),
        fontSize: typography['subtitle1'].fontSize
    },
    dropdownRoot: {
        marginRight: spacing(1)
    },
    listItem: {
        '& > li': {
            width: '100% !important'
        }
    },
    select: {},
    list: {
        //maxWidth: 'unset !important'
    },
    // ---- Card
    cardControl: {
        height: spacing(4),
        fontSize: typography['subtitle2'].fontSize
    },
    cardListItem: {
        '& > li': {
            minHeight: spacing(4)
        }
    },
    cardSelect: {
        paddingRight: `${spacing(4)}px !important`
    },
    // ---- Inactive
    inactiveControl: {
        border: 'unset !important',
        pointerEvents: 'none'
    },
    inactiveDropdownRoot: {
        display: 'none'
    }
}));
