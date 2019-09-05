import { makeStyles } from '@material-ui/core';
import { lime } from "@material-ui/core/colors";

export default makeStyles(({ palette, spacing }) => ({
    root: {
        textTransform: 'none',
        minWidth: spacing(20),
    },
    loading: {
        animation: '$color_pulsate 1s infinite alternate'
    },
    '@keyframes color_pulsate': {
        from: { backgroundColor: "#ffcc80" },
        to: { backgroundColor: "#fff3e0" }
    },
    icon: {
        marginRight: spacing(0.5)
    }
}));
