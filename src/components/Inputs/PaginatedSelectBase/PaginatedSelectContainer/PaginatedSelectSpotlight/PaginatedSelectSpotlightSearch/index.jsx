import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';

// Material
import { withStyles, InputAdornment, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchRounded';

// Local
import styles from './styles';
import { composeClasses } from 'helpers';

class PaginatedSelectSpotlightSearch extends Component {
    state = {
        value: ''
    };

    handleChange = ({ target: { value } }) => this.setState({ value });

    renderAdornment = ({ adornment }) => (
        <InputAdornment position='start'>
            <SearchIcon className={adornment} />
        </InputAdornment>
    );

    render() {
        const {
            state: { value },
            props: { classes, styles },
            handleChange,
            renderAdornment
        } = this;

        const c = composeClasses({ classes, styles });

        return (
            <InputBase
                className={c.root}
                startAdornment={renderAdornment(c)}
                fullWidth
                value={value}
                onChange={handleChange}
            />
        );
    }
}

PaginatedSelectSpotlightSearch.defaultProps = {};

PaginatedSelectSpotlightSearch.propTypes = {
    classes: PropTypes.object.isRequired
};

const _PaginatedSelectSpotlightSearch = withStyles(styles)(
    PaginatedSelectSpotlightSearch
);

export {
    _PaginatedSelectSpotlightSearch as default,
    _PaginatedSelectSpotlightSearch as PaginatedSelectSpotlightSearch
};
