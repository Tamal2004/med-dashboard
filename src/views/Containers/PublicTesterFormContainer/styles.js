import { makeStyles } from '@material-ui/core/styles';

import { Background, Logo } from 'assets';

export default makeStyles(
    ({ zIndex, transitions, palette, mixins, spacing, breakpoints }) => ({
        root: {
            flexGrow: 1
        },
        logo: {
            height: spacing(4),
            width: spacing(27),
            maxWidth: '100%',
            backgroundImage: `url(${Logo})`,
            backgroundSize: 'cover',

            [breakpoints.down('sm')]: {
                height: spacing(3.25),
                width: spacing(22.5),
                backgroundImage: `url(${Logo})`
            }
        },
        appBar: {
            background: '#fff',
            boxShadow: 'none',
            zIndex: zIndex.drawer + 1,
            transition: transitions.create(['width', 'margin'], {
                easing: transitions.easing.sharp,
                duration: transitions.duration.leavingScreen
            }),

            backgroundColor: palette.common.transparent,
            [breakpoints.down('sm')]: {
                backgroundColor: 'white',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                opacity: 0.95
            }
        },
        appBarSpacer: mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            width: '100vw',
            overflow: 'auto',
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        },
        container: {
            paddingTop: spacing(4),
            paddingBottom: spacing(4),
            opacity: 0.95
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
        },
        pointer: {
            cursor: 'pointer'
        }
    })
);
