import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material
import { makeStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
}));

/*
 * Domain:
 * Page: --
 * Component: LinearLoader
 * Type: --
 * LinearLoader
 */
const LinearLoader = ({ value, className, ...props }) => {
    const bufferProgress = useRef(() => {});
    const [valueBuffer, setBuffer] = useState(0);
    const [completed, setCompleted] = useState(false);
    const isValueNumber = typeof value === 'number';

    useEffect(() => {
        bufferProgress.current = () => {
            if (typeof value === 'number') {
                if (value >= 100) {
                    setCompleted(true);
                } else {
                    setCompleted(false);
                    const buffer = Math.random() * 10;
                    setBuffer(value + buffer);
                }
            }
        };
    });

    useEffect(() => {
        const progress = () => {
            bufferProgress.current();
        };
        const bufferInterval = setInterval(progress, 250);
        return () => {
            clearInterval(bufferInterval);
        };
    }, []);

    const isProgressLoader = isValueNumber && !completed;

    const loaderProps = {
        className: clsx(useStyles().root, className),
        ...(isProgressLoader
            ? {
                  variant: 'buffer',
                  value,
                  valueBuffer
              }
            : {}),
        ...props
    };

    return !completed && !!value && <LinearProgress {...loaderProps} />;
};

LinearLoader.propTypes = {
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired
};

export { LinearLoader as default, LinearLoader };
