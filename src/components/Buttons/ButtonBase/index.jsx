import React, { Fragment, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { withStyles, Button } from '@material-ui/core';

// Local
import { styles } from './styles';
import { LinearLoader } from 'components';
import { composeClasses } from 'libs';

const ButtonBase = ({
    classes,
    styles,
    children,
    className,
    variant,
    enableLoader,
    onClick,
    ...restProps
}) => {
    const buttonRef = useRef(null);
    const [{ height, width }, setDimensions] = useState({
        height: 24,
        width: 128
    });
    const [loading, unscopedSetLoading] = useState(false);
    const setLoading = useRef(() => {});

    useEffect(() => {
        let cancelled = false;
        setLoading.current = progress =>
            !cancelled && unscopedSetLoading(progress);

        const { offsetHeight = 36, offsetWidth = 0 } = buttonRef.current;
        setDimensions({ height: offsetHeight, width: offsetWidth });

        return () => (cancelled = true);
    }, []);

    useEffect(() => {
        loading >= 100 && unscopedSetLoading(false);
    });

    const { loader, container, ...c } = composeClasses({
        classes,
        styles
    });

    const isLoading = enableLoader && !restProps.disabled && !!loading;

    const loaderProps = {
        className: loader,
        style: { top: `${height - 4}px`, width },
        color: restProps.color,
        value: isLoading ? loading : false
    };

    const handleClick = async (...args) => {
        const [event, ...restArgs] = args;
        const passedArgs = [
            {
                ...event,
                setLoading: progress => setLoading.current(progress)
            },
            ...restArgs
        ];

        setLoading.current(true);
        const returnValue = await onClick.apply(null, passedArgs);
        setLoading.current(false);
        return returnValue;
    };

    return (
        <div className={container} style={{ height: `${height}px` }}>
            <Button
                ref={buttonRef}
                variant={isLoading ? 'outlined' : variant}
                onClick={isLoading ? () => {} : handleClick}
                classes={c}
                {...restProps}
            >
                {children}
            </Button>
            <LinearLoader {...loaderProps} />
        </div>
    );
};

ButtonBase.defaultProps = {
    variant: 'contained',
    enableLoader: false,
    disabled: false,
    onClick: () => {}
};

const _ButtonBase = withStyles(styles)(ButtonBase);

export { _ButtonBase as default, _ButtonBase as ButtonBase };
