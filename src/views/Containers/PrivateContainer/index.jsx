import React, { Fragment } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listBlogs } from 'graphql/queries';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { ListItems } from './listItems';
import styles from './styles';
import { Logo } from 'assets';
import { Link } from 'components';
import { history } from 'libs/history';

const useStyles = styles;

export default function Dashboard(props) {
    const c = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const NavIcon = () => (
        <Fragment>
            <IconButton
                size='small'
                edge='start'
                title='Go Back'
                disabled={history.length <= 1}
                onClick={() => history && history.goBack()}
            >
                <ArrowLeftIcon />
            </IconButton>
            <IconButton
                size='small'
                edge='start'
                title='Go Forward'
                disabled={history.length <= 1}
                onClick={() => history && history.goForward()}
            >
                <ArrowRightIcon />
            </IconButton>
        </Fragment>
    );

    const BarTitle = () => {
        const hist = history ? history.location.pathname : '';
        const splitInfo = hist.split('/');
        const text = splitInfo.length >= 1 ? splitInfo[1] : '';

        return <div className={c.barTitle}>{text.toUpperCase()} </div>;
    };

    return (
        <div className={c.root}>
            <AppBar
                position='absolute'
                className={clsx(c.appBar, open && c.appBarShift)}
            >
                <Toolbar className={c.toolbar}>
                    <IconButton
                        color='primary'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        className={clsx(c.menuButton, open && c.menuItemHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavIcon />
                    <BarTitle />
                    {/*<button onClick={callMe}>HHHHHHHHHHHHHH</button>*/}
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
                classes={{
                    paper: clsx(c.drawerPaper, !open && c.drawerPaperClose)
                }}
                open={open}
            >
                <div className={c.toolbarIcon}>
                    <Link to='/'>
                        <img className={c.logo} src={Logo} alt='WUP' />
                    </Link>
                    <IconButton size='small' onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <List
                    className={(!open && c.menuItemHidden) || ''}
                    disablePadding={true}
                >
                    <ListItems />
                </List>
            </Drawer>
            <main className={c.content}>
                <div className={c.appBarSpacer} />
                <Container maxWidth='lg' className={c.container}>
                    {props.children}
                </Container>
            </main>
        </div>
    );
}
