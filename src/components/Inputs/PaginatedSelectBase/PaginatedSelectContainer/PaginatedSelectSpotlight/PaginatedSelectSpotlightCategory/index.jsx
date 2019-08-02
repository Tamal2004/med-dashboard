import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';

// Material
import { withStyles, MenuItem, Select } from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

// Local
import styles from './styles';
import { composeClasses } from 'helpers';
import ReactDOM from 'react-dom';

class PaginatedSelectSpotlightCategory extends Component {
    state = { value: 'all', height: 0 };

    componentDidMount() {
        this.setState({
            // 3 for borders
            height: ReactDOM.findDOMNode(this.selectRef).offsetHeight - 3
        });
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ value });
        this.props.onChange(value);
    };

    render() {
        const {
            state: { height, value },
            props: { classes, styles, categories },
            handleChange
        } = this;

        const { container, paper, ...c } = composeClasses({ classes, styles });

        const MenuProps = {
            disablePortal: true,
            getContentAnchorEl: null,
            transformOrigin: { vertical: -height, horizontal: 'right' },
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            classes: { paper }
        };

        return (
            <Select
                ref={ref => (this.selectRef = ref)}
                className={container}
                classes={c}
                MenuProps={MenuProps}
                fullWidth
                disableUnderline
                onChange={handleChange}
                value={value}
                IconComponent={DropdownIcon}
            >
                <MenuItem value='all'>All Categories</MenuItem>
                {categories.map((category, index) => (
                    <MenuItem value={index} key={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>
        );
    }
}

PaginatedSelectSpotlightCategory.defaultProps = {};

PaginatedSelectSpotlightCategory.propTypes = {
    classes: PropTypes.object.isRequired
};

const _PaginatedSelectSpotlightCategory = withStyles(styles)(
    PaginatedSelectSpotlightCategory
);

export {
    _PaginatedSelectSpotlightCategory as default,
    _PaginatedSelectSpotlightCategory as PaginatedSelectSpotlightCategory
};
