import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

// Local
import styles from './styles';
import { Logo } from 'assets';

const useStyles = styles;

export default function TesterContainer(props) {
    const c = useStyles();

    return (
        <div className={c.root}>
            <AppBar position='absolute' className={clsx(c.appBar)}>
                <Toolbar classes={{ root: c.toolbarRoot }}>
                    <div onClick={props.gotoSignIn} className={c.pointer}>
                        <img className={c.logo} src={Logo} alt='WUP' />
                    </div>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={props.gotoSignIn}
                        className={c.backIcon}
                    >
                        Sign in
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={c.content}>
                <div className={c.appBarSpacer} />
                <Container maxWidth='lg' className={c.container}>
                    {props.children}
                </Container>
            </main>
        </div>
    );
}
