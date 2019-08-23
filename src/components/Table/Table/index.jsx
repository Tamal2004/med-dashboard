import React, { Component, Fragment } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material
import {
    withStyles,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

// Local
import styles from './styles';
import { composeClasses } from 'libs';
import { Tooltip } from '../../Tooltips';
import { Input } from '../../FormComponents';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckFillIcon from '@material-ui/icons/CheckBox';
import CheckEmptyIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';

// 'actions': {
//         checkAction: () => console.log('Check Meh'),
//         deleteAction: () => console.log('Delete Meh')
//     }

const isActionColumn = value => value && value === 'actions';

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

    componentDidUpdate({ data: prevData = [] }, s, c) {
        const { data = [] } = this.props;
        if (prevData.length !== data.length)
            this.setState({ data, initialData: data });
    }
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

    setEditIndex = index => this.setState({ rowEditIndex: index });

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
        <IconButton
            className={this.c.action}
            size='small'
            color='secondary'
            aria-label='Check'
            fontSize='small'
            onClick={() => {
                this.checkIndex(idx);
                return onClick();
            }}
        >
            {this.isChecked(idx) ? <CheckFillIcon /> : <CheckEmptyIcon />}
        </IconButton>
    );

    DeleteAction = (onClick = () => {}) => (
        <IconButton
            className={this.c.action}
            size='small'
            color='primary'
            aria-label='Delete'
            onClick={onClick}
        >
            <DeleteIcon />
        </IconButton>
    );

    EditAction = (onClick = () => {}) => (
        <IconButton
            className={this.c.action}
            size='small'
            color='secondary'
            fontSize='small'
            aria-label='Edit'
            onClick={onClick}
        >
            <EditIcon />
        </IconButton>
    );

    renderCell = (value = '', idx) => {
        const isExists = key =>
            Object.prototype.hasOwnProperty.call(value, key);

        const composeValue = () => {
            if (value && typeof value === 'object') {
                if (isExists('Component')) {
                    return value.Component;
                } else {
                    const editModal = this.props.handleEditModal;
                    const actions = [];
                    if (isExists('checkAction'))
                        actions.push(this.CheckAction(value.checkAction, idx));
                    if (editModal && editModal !== void 0)
                        actions.push(
                            this.EditAction(() =>
                                editModal({ editiIndex: idx })
                            )
                        );
                    if (isExists('deleteAction'))
                        actions.push(this.DeleteAction(value.deleteAction));

                    return actions.map((action, key) => (
                        <Fragment key={key}>{action}</Fragment>
                    ));
                }
            } else return value;
        };

        return (
            <Tooltip
                placement='bottom-start'
                title={this.rawValue(value || '')}
            >
                <div className={this.c.titleWrapper} ref={ref}>
                    {composeValue()}
                </div>
            </Tooltip>
        );
    };

    rawValue = obj => (obj && typeof obj === 'object' ? obj.value : obj);

    renderRow = (row, index) =>
        Object.entries(row).map(([category, value]) => (
            <TableCell
                className={this.c.cell}
                align={isActionColumn(category) ? 'right' : 'inherit'}
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
            props: { data: [datum = {}] = [], itemsPerPage, handleEditModal },
            state: { data },
            c,
            handleSort,
            renderSortIcon,
            renderTable
        } = this;


        const headers = Object.keys(datum).map(value =>
            value === 'actions' ? ' ' : value
        );

        const totalPages =
            Math.floor(data.length / itemsPerPage) +
                !!(data.length % itemsPerPage) || 1;

        const actionDecrement =
            isActionColumn || (handleEditModal && handleEditModal !== void 0)
                ? 1
                : 0;

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
                                        onClick={() => handleSort(index)}
                                    >
                                        {header}
                                        {index < len - actionDecrement &&
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
    itemsPerPage: 10
};

Table.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    filter: PropTypes.string,
    itemsPerPage: PropTypes.number
};

const _Table = withStyles(styles)(Table);

export { _Table as default, _Table as Table };
