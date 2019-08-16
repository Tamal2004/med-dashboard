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
import { Tooltip } from '../../Tooltips';

import SvgIcon from '@material-ui/core/SvgIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckFillIcon from '@material-ui/icons/CheckBox';
import CheckEmptyIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';

// '': {
//         checkAction: () => console.log('Check Meh'),
//         editAction: () => console.log('Edit Meh'),
//         deleteAction: () => console.log('Delete Meh')
//     }

const capitalize = value => (value ? value.toUpperCase() : value);

const isActionColumn = value => {
    let actionHandlers = ['checkAction', 'editAction', 'deleteAction'];
    let isExists = elem => value.hasOwnProperty(elem);
    return actionHandlers.some(isExists); // if one exists
};

const ref = React.createRef();

class Table extends Component {
    state = {
        sortIndex: null,
        initialData: this.props.data,
        data: this.props.data,
        checked: []
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

    isChecked = id => this.state.checked.includes(id);

    checkIndex = id => {
        const { checked } = this.state;
        let newChecked = [];
        if (this.isChecked(id)) {
            checked.splice(checked.indexOf(id), 1);
            newChecked = [...checked];
        } else {
            newChecked = [...checked, id];
        }

        this.setState({ checked: newChecked });
    };

    CheckAction = (onClick = () => {}, idx) => (
        <SvgIcon
            size='small'
            color='action'
            aria-label='Check'
            fontSize='small'
            onClick={() => {
                this.checkIndex(idx);
                return onClick();
            }}
        >
            {this.isChecked(idx) ? <CheckFillIcon /> : <CheckEmptyIcon />}
        </SvgIcon>
    );

    DeleteAction = (onClick = () => {}) => (
        <SvgIcon
            size='small'
            color='error'
            fontSize='small'
            aria-label='Delete'
            onClick={() => onClick()}
        >
            <DeleteIcon />
        </SvgIcon>
    );

    EditAction = (onClick = () => {}) => (
        <SvgIcon
            size='small'
            color='action'
            fontSize='small'
            aria-label='Edit'
            onClick={onClick}
        >
            <EditIcon />
        </SvgIcon>
    );

    renderCell = (value = '', idx) => {
        let returnValue = this.props.action ? '' : value;
        const isExists = key =>
            Object.prototype.hasOwnProperty.call(value, key);

        if (value) {
            if (typeof value === 'object') {
                if (isExists('Component')) returnValue = value.Component;
                if (isExists('checkAction'))
                    returnValue = this.CheckAction(value.checkAction, idx);
                if (isExists('editAction'))
                    returnValue = (
                        <Fragment>
                            {returnValue} {this.EditAction(value.editAction)}
                        </Fragment>
                    );
                if (isExists('deleteAction'))
                    returnValue = (
                        <Fragment>
                            {returnValue}{' '}
                            {this.DeleteAction(value.deleteAction)}
                        </Fragment>
                    );
            }
        }

        return (
            <Tooltip
                placement='bottom-start'
                title={this.rawValue(value || '')}
            >
                <div className={this.c.titleWrapper} ref={ref}>
                    {returnValue}
                </div>
            </Tooltip>
        );
    };

    rawValue = obj => (obj && typeof obj === 'object' ? obj.value : obj);

    renderRow = (row, index) =>
        Object.entries(row).map(([category, value]) => (
            <TableCell
                className={this.c.cell}
                align={isActionColumn(value) ? 'right' : 'inherit'}
                key={category}
            >
                {this.renderCell(value, index)}
            </TableCell>
        ));

    renderTable = () => {
        const {
            props: { page, itemsPerPage },
            state: { data },
            c,
            handleClick,
            renderRow
        } = this;

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        return data.map(
            (row, index) =>
                index >= startIndex &&
                index < endIndex && (
                    <TableRow key={index} className={c.row}>
                        {renderRow(row, index)}
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
            props: { data: [datum = {}] = [], action, itemsPerPage },
            state: { data },
            c,
            handleSort,
            renderSortIcon,
            renderTable
        } = this;

        const headers = Object.keys(datum);
        const totalPages =
            Math.floor(data.length / itemsPerPage) +
                !!(data.length % itemsPerPage) || 1;

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
                                const len = headers.length;

                                return (
                                    <TableCell
                                        className={clsx(c.cell, c.cellHeader)}
                                        style={{
                                            maxWidth: headerWidth,
                                            minWidth: headerWidth
                                        }}
                                        key={index}
                                        onClick={() =>
                                            action &&
                                            index < len &&
                                            handleSort(index)
                                        }
                                    >
                                        {header}
                                        {action &&
                                            index < len &&
                                            renderSortIcon(index)}
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

Table.defaultProps = {
    action: false,
    itemsPerPage: 10
};

Table.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    filter: PropTypes.string,
    action: PropTypes.bool,
    itemsPerPage: PropTypes.number
};

const _Table = withStyles(styles)(Table);

export { _Table as default, _Table as Table };
