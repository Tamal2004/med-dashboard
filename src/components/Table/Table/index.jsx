import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material
import {
    withStyles,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

// Local
import styles from './styles';
import { composeClasses } from 'libs';
import { PaginationBase } from '../Pagination';

const capitalize = value => (value ? value.toUpperCase() : value);

class Table extends Component {
    ITEMS_PER_PAGE = 10;

    state = {
        sortIndex: null,
        initialData: this.props.data,
        data: this.props.data
    };

    // Classes
    c = composeClasses({
        classes: this.props.classes,
        styles: this.props.styles
    });

    handleSort = idx => {
        const {
            state: { sortIndex: prevSortIndex, initialData }
        } = this;

        const fixedIdx = idx + 1;

        const sortIndex = prevSortIndex === fixedIdx ? fixedIdx * -1 : fixedIdx;

        this.setState({
            sortIndex
        });
        const data = [...initialData];

        data.sort((a, b) => {
            let aValue = Object.values(a)[idx];
            let bValue = Object.values(b)[idx];

            aValue = typeof aValue === 'object' ? aValue.value : aValue;
            bValue = typeof bValue === 'object' ? bValue.value : bValue;


            let aParsed = aValue.toLowerCase();
            const bParsed = bValue.toLowerCase();

            if (!isNaN(aParsed)) aParsed = Number(aParsed);

            if (aParsed < bParsed) {
                return -1;
            }
            if (aParsed > bParsed) {
                return 1;
            }
            return 0;
        });

        if (sortIndex < 0) data.reverse();

        this.setState({ data });
    };

    renderCell = value => {
        const { c } = this;

        const renderedValue = typeof value === 'object' ? value.Component : value;

        return <Fragment>{renderedValue}</Fragment>;
    };

    renderRow = row =>
        Object.entries(row).map(([category, value]) => (
            <TableCell className={this.c.cell} key={category}>
                {this.renderCell(value)}
            </TableCell>
        ));

    renderTable = () => {
        const {
            props: { page },
            state: { data },
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
                    <TableRow key={index} className={c.row}>
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
            state: { data },
            c,
            handleSort,
            renderSortIcon,
            renderTable,
            ITEMS_PER_PAGE
        } = this;

        const headers = Object.keys(datum);
        const totalPages =
            Math.floor(data.length / ITEMS_PER_PAGE) +
                !!(data.length % ITEMS_PER_PAGE) || 1;

        return (
            <Fragment>
                <MuiTable className={c.root}>
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
                </MuiTable>
            </Fragment>
        );
    }
}

Table.defaultProps = {};

Table.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    filter: PropTypes.string
};

const _Table = withStyles(styles)(Table);

export { _Table as default, _Table as Table };
