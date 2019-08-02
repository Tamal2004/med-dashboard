import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';

// Material
import {
    withStyles,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

// Local
import styles from './styles';
import { composeClasses } from 'helpers';

const capitalize = value => value.toUpperCase();

class PaginatedSelectTable extends Component {
    ITEMS_PER_PAGE = 10;

    state = {
        sortIndex: null
    };

    // Classes
    c = composeClasses({
        classes: this.props.classes,
        styles: this.props.styles
    });

    handleClick = index => {
        const { data, onClick } = this.props;

        const datum = data[index];
        const [referenceKey] = Object.keys(datum).filter(
            key => !!key.toLowerCase().includes('reference')
        );
        onClick(datum[referenceKey]);
    };

    handleSort = idx => {
        const {
            state: { sortIndex: prevSortIndex },
            props: { onSort }
        } = this;

        const fixedIdx = idx + 1;

        const sortIndex = prevSortIndex === fixedIdx ? fixedIdx * -1 : fixedIdx;

        this.setState({
            sortIndex
        });
        onSort(sortIndex);
    };

    renderCell = (value, category) => {
        const {
            props: { filter, categories },
            c
        } = this;

        const cappedValue = capitalize(value);
        const cappedFilter = capitalize(filter);
        const shouldFilter =
            filter &&
            categories.includes(category) &&
            cappedValue.includes(cappedFilter);

        let start = value;
        let parsedFilter = filter;
        let end = '';

        if (shouldFilter) {
            const startIdx = cappedValue.indexOf(cappedFilter);

            start = value.slice(0, startIdx);
            parsedFilter = value.substr(startIdx, filter.length);
            end = value.slice(startIdx + filter.length);
        }

        return (
            <Fragment>
                {start}
                {shouldFilter && (
                    <span className={c.highlight}>{parsedFilter}</span>
                )}
                {shouldFilter && end}
            </Fragment>
        );
    };

    renderRow = row =>
        Object.entries(row).map(([category, value], idx) => (
            <TableCell className={this.c.cell} key={category}>
                {this.renderCell(value, idx)}
            </TableCell>
        ));

    renderTable = () => {
        const {
            props: { data, page },
            ITEMS_PER_PAGE,
            c,
            handleClick,
            renderRow
        } = this;

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = page * ITEMS_PER_PAGE;
        return data.map(
            (row, index) =>
                index >= startIndex &&
                index < endIndex && (
                    <TableRow
                        key={index}
                        className={c.row}
                        onClick={() => handleClick(index)}
                    >
                        {renderRow(row)}
                    </TableRow>
                )
        );
    };

    renderSortIcon = idx => {
        const {
            state: { sortIndex },
            c
        } = this;

        const isActive = Math.abs(sortIndex) - 1 === idx;
        const isReversed = isActive && sortIndex < 0;
        const iconClass = clsx(
            c.icon,
            isActive && c.activeIcon,
            isReversed && c.reverseIcon
        );

        return <DropdownIcon className={iconClass} />;
    };

    render() {
        const {
            props: { data: [datum = {}] = [] },
            c,
            handleSort,
            renderSortIcon,
            renderTable
        } = this;

        const headers = Object.keys(datum);
        return (
            <Table className={c.root}>
                <TableHead>
                    <TableRow className={clsx(c.row, c.header)}>
                        {headers.map((header, index) => {
                            const unitWidth = 8 * 8;
                            const headerWidth = header.includes('Reference')
                                ? unitWidth * 1.5
                                : unitWidth * 2;

                            console.log(
                                'check',
                                header,
                                header.includes('Reference')
                            );
                            return (
                                <TableCell
                                    className={clsx(c.cell, c.cellHeader)}
                                    style={{
                                        maxWidth: headerWidth,
                                        minWidth: headerWidth
                                    }}
                                    key={index}
                                    onClick={() => handleSort(index)}
                                >
                                    {header}
                                    {renderSortIcon(index)}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody className={c.body}>{renderTable(c)}</TableBody>
            </Table>
        );
    }
}

PaginatedSelectTable.defaultProps = {};

PaginatedSelectTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    filter: PropTypes.string
};

const _PaginatedSelectTable = withStyles(styles)(PaginatedSelectTable);

export {
    _PaginatedSelectTable as default,
    _PaginatedSelectTable as PaginatedSelectTable
};
