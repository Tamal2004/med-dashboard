import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import styles from './styles';
import { Logo } from 'assets';

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
                        className={clsx(
                            c.menuButton,
                            open && c.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
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
                    <img className={c.logo} src={Logo} alt='WUP' />
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
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
