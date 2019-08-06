import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing }) => ({
    control: {
        height: spacing(6)
    },
    dropdownRoot: {
        marginRight: spacing(1)
    },
    listItem: {
        '& > li': {
            width: '100% !important'
        }
    }
}));
