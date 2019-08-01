import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const linkStyle = {
    color: 'rgba(0, 0, 0, 0.87)'
};

const isEmpty = str => !str || 0 === str.length;

const Breadcrumb = props => {
    const { path } = props;
    const paths = path
        ? path
              .split('/')
              .filter(path => !isEmpty(path))
              .map(
                  path =>
                      path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()
              )
        : [];

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            arial-label='Breadcrumb'
        >
            {paths.map((path, index) => {
                return (
                    <Fragment key={index}>
                        {paths.length - 1 === index ? (
                            <Typography color='textPrimary'>{path}</Typography>
                        ) : (
                            <Link style={linkStyle} color='inherit' to={''}>
                                {path}
                            </Link>
                        )}
                    </Fragment>
                );
            })}
        </Breadcrumbs>
    );
};

Breadcrumb.defaultProps = {
    paths: {}
};

Breadcrumb.propTypes = {
    paths: PropTypes.object
};

export { Breadcrumb as default, Breadcrumb };
