import React from 'react';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Card, Typography } from '@material-ui/core';

const Container = ({ title, children }) => {
    const c = useStyles();
    return (
        <Card className={c.root}>
            {title && (
                <Typography className={c.header} variant='h5'>
                    {title}
                </Typography>
            )}
            {children}
        </Card>
    );
};

Container.defaultProps = {
    title: ''
};

Container.propTypes = {
    title: PropTypes.string
};

export { Container as default, Container };
