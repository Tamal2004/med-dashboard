import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';

// Material
import {
    withStyles,
    Button,
    Card,
    Slide,
    CardActions,
    Typography
} from '@material-ui/core';

// Local
import styles from './styles';
import { composeClasses } from 'helpers';
import { PaginationBase } from 'components';
import PaginatedSelectSpotlight from './PaginatedSelectSpotlight';
import PaginationSelectTable from './PaginationSelectTable';

class PaginatedSelectContainer extends Component {
    state = {
        initialData: this.props.data,
        data: this.props.data,
        page: 1,
        value: '',
        categories: []
    };

    ITEMS_PER_PAGE = 10;

    handlePage = page => this.setState({ page });

    handleFilter = ({ value, category }) => {
        const {
            state: { initialData }
        } = this;
        const categories =
            category === 'all'
                ? Array.range(0, Object.values(initialData[0]).length - 1)
                : [category];

        const data = initialData.filter(rowData =>
            categories.some(
                categoryIdx =>
                    value === '' ||
                    Object.values(rowData)
                        [categoryIdx].toLowerCase()
                        .includes(value.toLowerCase())
            )
        );
        this.setState({ data, value, categories });
    };
    handleSort = sortIdx => {
        console.log('sort', sortIdx)
        const {
            state: { initialData }
        } = this;

        const data = [...initialData];

        const fixedIdx = Math.abs(sortIdx) - 1;

        data.sort((a, b) => {
            let aValue = Object.values(a)[fixedIdx].toLowerCase();
            const bValue = Object.values(b)[fixedIdx].toLowerCase();

            if (!isNaN(aValue)) aValue = Number(aValue);

            if (aValue < bValue) {
                return -1;
            }
            if (aValue > bValue) {
                return 1;
            }
            return 0;
        });

        if (sortIdx < 0)
            data.reverse();

        this.setState({ data });
    };

    render() {
        const {
            state: {
                initialData: [datum],
                data,
                page,
                value,
                categories
            },
            props: { classes, styles },
            ITEMS_PER_PAGE,
            handleFilter,
            handlePage,
            handleSort
        } = this;

        const c = composeClasses({ classes, styles });

        const totalPages =
            Math.floor(data.length / ITEMS_PER_PAGE) +
                !!(data.length % ITEMS_PER_PAGE) || 1;

        return (
            <Card className={c.root}>
                <PaginatedSelectSpotlight
                    onFilter={handleFilter}
                    categories={Object.keys(datum)}
                />
                <PaginationSelectTable
                    page={page}
                    data={data}
                    filter={value}
                    categories={categories}
                    onClick={ref => console.log('ref', ref)}
                    onSort={handleSort}
                />
                <CardActions className={c.footer}>
                    <Typography variant='subtitle1' className={c.total}>
                        Total Items: {data.length}
                    </Typography>

                    <PaginationBase
                        totalPages={totalPages}
                        transitionSpeed={150}
                        handlePage={handlePage}
                    />
                </CardActions>
            </Card>
        );
    }
}

PaginatedSelectContainer.defaultProps = {};

PaginatedSelectContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

const _PaginatedSelectContainer = withStyles(styles)(PaginatedSelectContainer);

export {
    _PaginatedSelectContainer as default,
    _PaginatedSelectContainer as PaginatedSelectContainer
};
