import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    logo: {
        height: 28,
        maxWidth: '100%'
    },
    appBar: {
        background: '#fff',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#EAEBEF'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    toolbarRoot: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    backIcon: {
        color: '#fff'
    },
    leftIcon: {
        fill: 'rgba(0, 0, 0, 0.87)'
    }
}));
