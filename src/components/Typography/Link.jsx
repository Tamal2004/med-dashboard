import React from 'react';
import PropTypes from 'prop-types';
import { Link as DomLink } from 'react-router-dom';

// Material
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
    root: {
        textDecoration: 'none',
        color: palette.primary.main
    }
}));

const Link = ({ children, ...props }) => {
    const { root } = useStyles();
    return (
        <DomLink className={root} {...props}>
            {children}
        </DomLink>
    );
};

Link.propTypes = {
    to: PropTypes.string.isRequired
};

export { Link as default, Link };
