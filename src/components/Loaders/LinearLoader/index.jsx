import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

// Material
import { withStyles, LinearProgress } from '@material-ui/core';

// Local
import styles from './styles';

/*
 * Domain:
 * Page: --
 * Component: LinearLoader
 * Type: --
 * LinearLoader
 */
const LinearLoader = ({ classes: { root }, progress }) => (
    <div className={root}>
        <LinearProgress
            variant='buffer'
            value={progress}
            valueBuffer={progress + 3}
        />
    </div>
);

LinearLoader.propTypes = {
    classes: PropTypes.object.isRequired,
    progress: PropTypes.number.isRequired,
    loader: PropTypes.string.isRequired,
};

const mapStateToProps = ({ utils: { loaders } }, { loader }) => ({
    progress: loaders[loader],
});

const _LinearLoader = compose(
    connect(mapStateToProps),
    withStyles(styles)
)(LinearLoader);

export { _LinearLoader as default, _LinearLoader as LinearLoader };
