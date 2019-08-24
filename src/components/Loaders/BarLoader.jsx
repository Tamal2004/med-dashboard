import React from 'react';
import clsx from 'clsx';
import { BarLoader as CSSBarLoader } from 'react-css-loaders';

import { makeStyles, useTheme } from '@material-ui/core';
//import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: spacing(28)
    },
    screenHeight: {
        height: `calc(100vh - ${spacing(16)}px)`
    }
}));

const BarLoader = ({ className, color, fullScreen, size, ...restProps }) => {
    const c = useStyles();
    const primaryColor = useTheme().palette.primary.light;
    const props = {
        color: color || primaryColor,
        size: fullScreen ? 24 : size,
        ...restProps
    };
    return (
        <div className={clsx(c.root, fullScreen && c.screenHeight, className)}>
            <CSSBarLoader {...props} />
        </div>
    );
};

BarLoader.defaultProps = {
    size: 16,
    fullScreen: false
};

export { BarLoader as default, BarLoader };
