import React from 'react';

import { makeStyles } from '@material-ui/core';

// Assets
import { Background } from 'assets';

const useStyles = makeStyles(() => ({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        zIndex: 0,
        top: 0,
        left: 0,
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

const AuthWrapper = ({ children }) => (
    <div className={useStyles().root}>{children}</div>
);

export { AuthWrapper as default, AuthWrapper };
