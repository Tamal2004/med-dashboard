import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, spacing, typography }) => ({
    // ---- Inactive
    inactiveControl: {
        border: 'unset !important',
        pointerEvents: 'none'
    },
    inactiveIcon: {
        display: 'none'
    }
}));
