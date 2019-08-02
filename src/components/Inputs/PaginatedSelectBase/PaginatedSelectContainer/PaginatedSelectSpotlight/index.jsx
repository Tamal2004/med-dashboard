import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';

// Material
import {
    withStyles,
    Button,
    Grid,
    InputBase,
    InputAdornment
} from '@material-ui/core';

// Local
import styles from './styles';
import { composeClasses } from 'helpers';
import PaginatedSelectSpotlightCategory from './PaginatedSelectSpotlightCategory';
import SearchIcon from '@material-ui/icons/SearchRounded';

class PaginatedSelectSpotlight extends Component {
    state = {
        value: '',
        category: 'all'
    };

    handleInput = ({ target: { value = '' } = {} } = {}) => {
        const {
            state: { category },
            props: { onFilter }
        } = this;
        this.setState({ value });
        onFilter({ value, category });
    };

    handleCategory = category => {
        const {
            state: { value },
            props: { onFilter }
        } = this;
        this.setState({ category });
        onFilter({ value, category });
    };

    renderAdornment = ({ adornment }) => (
        <InputAdornment position='start'>
            <SearchIcon className={adornment} />
        </InputAdornment>
    );

    render() {
        const {
            state: { value },
            props: { classes, styles, categories },
            handleCategory,
            handleInput,
            renderAdornment
        } = this;

        const c = composeClasses({ classes, styles });

        return (
            <Grid container className={c.root} direction='row'>
                <Grid item xs={10}>
                    <Grid container className={c.spotlight}>
                        <Grid item xs={7}>
                            <InputBase
                                className={c.input}
                                startAdornment={renderAdornment(c)}
                                fullWidth
                                value={value}
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <PaginatedSelectSpotlightCategory
                                categories={categories}
                                onChange={handleCategory}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} className={c.buttonContainer}>
                    <Button
                        variant='text'
                        className={c.button}
                        onClick={handleInput}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

PaginatedSelectSpotlight.defaultProps = {};

PaginatedSelectSpotlight.propTypes = {
    classes: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired
};

const _PaginatedSelectSpotlight = withStyles(styles)(PaginatedSelectSpotlight);

export {
    _PaginatedSelectSpotlight as default,
    _PaginatedSelectSpotlight as PaginatedSelectSpotlight
};
