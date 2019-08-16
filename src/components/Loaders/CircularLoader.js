import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const CircularLoader = ({ color, size }) => {
    return <CircularProgress color={color} size={size} />;
};

CircularLoader.defaultProps = {
    color: 'primary',
    size: 40
};
CircularLoader.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number
};

export { CircularLoader as default, CircularLoader };
