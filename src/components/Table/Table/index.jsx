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
    IconButton,
    Typography
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
        sortIndices: Array.range(0, this.props.data.length - 1),
        checked: [],
        selectAll: false
    };

    // Classes
    c = composeClasses({
        classes: this.props.classes,
        styles: this.props.styles
    });

    componentDidUpdate({ data: prevData = [] }, s, c) {
        const { data = [] } = this.props;
        if (prevData !== data)
            this.setState({
                data,
                initialData: data,
                sortIndices: Array.range(0, data.length - 1)
            });
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

        const indexedData = initialData.map((datum, index) => ({
            datum,
            index
        }));

        indexedData.sort(({ datum: a }, { datum: b }) => {
            const composeValue = value => {
                if (value !== null && typeof value === 'object') {
                    if (!Object.keys(value).includes('value')) {
                        return composeValue(value.Component);
                    } else return value.value;
                } else return value;
            };

            const aValue = composeValue(Object.values(a)[idx]);
            const bValue = composeValue(Object.values(b)[idx]);

            let aParsed = isNaN(aValue) ? aValue.toLowerCase() : Number(aValue);
            let bParsed = isNaN(bValue) ? bValue.toLowerCase() : Number(bValue);

            if (aParsed < bParsed) {
                return -1;
            }
            if (aParsed > bParsed) {
                return 1;
            }
            return 0;
        });

        if (sortIndex < 0) {
            indexedData.reverse();
        }

        const [data, sortIndices] = indexedData.reduce(
            ([data, sortIndices], { datum, index }) => [
                [...data, datum],
                [...sortIndices, index]
            ],
            [[], []]
        );

        this.setState({ data, sortIndices });
    };

    isChecked = id => this.state.checked.includes(id);

    setEditIndex = index => this.setState({ rowEditIndex: index });

    setIndexArray = (length, onClick) => {
        const { selectAll } = this.state;
        const indexContainer = [];
        if (!selectAll) {
            for (let i = 0, len = length; i < len; i++) {
                indexContainer.push(i);
            }
        }
        this.setState(
            { checked: [...indexContainer], selectAll: !selectAll },
            () => onClick(this.state.checked)
        );
    };

    checkIndex = (id, onClick) => {
        const { checked } = this.state;
        let newChecked = [];
        if (this.isChecked(id)) {
            checked.splice(checked.indexOf(id), 1);
            newChecked = [...checked];
        } else {
            newChecked = [...checked, id];
        }

        this.setState({ checked: newChecked }, () =>
            onClick(this.state.checked)
        );
    };

    CheckAllAction = ({ onClick = () => {}, dataLength }) => {
        return (
            <IconButton
                className={this.c.action}
                size='small'
                color='secondary'
                aria-label='Check'
                fontSize='small'
                onClick={() => this.setIndexArray(dataLength, onClick)}
            >
                {this.state.selectAll ? <CheckFillIcon /> : <CheckEmptyIcon />}
            </IconButton>
        );
    };

    CheckAction = (onClick = () => {}, idx) => (
        <IconButton
            className={this.c.action}
            size='small'
            color='secondary'
            aria-label='Check'
            fontSize='small'
            onClick={() => {
                this.checkIndex(idx, onClick);
            }}
        >
            {this.isChecked(idx) ? <CheckFillIcon /> : <CheckEmptyIcon />}
        </IconButton>
    );

    DeleteAction = (onClick = () => {}, idx) => (
        <IconButton
            className={this.c.action}
            size='small'
            color='primary'
            aria-label='Delete'
            onClick={() => onClick(idx)}
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

        const calibratedIdx = this.state.sortIndices[idx];

        const composeValue = () => {
            if (value && typeof value === 'object') {
                if (isExists('Component')) {
                    return value.Component;
                } else {
                    const editModal = this.props.handleEditModal;
                    const actions = [];
                    if (editModal && editModal !== void 0)
                        actions.push(
                            this.EditAction(() =>
                                editModal({ editIndex: calibratedIdx })
                            )
                        );
                    if (isExists('deleteAction'))
                        actions.push(
                            this.DeleteAction(value.deleteAction, calibratedIdx)
                        );

                    if (isExists('checkAction'))
                        actions.push(
                            this.CheckAction(value.checkAction, calibratedIdx)
                        );
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
                dark
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
            props: {
                data: [datum = {}] = [],
                itemsPerPage,
                handleEditModal,
                checkAll,
                noResultsText
            },
            state: { data },
            c,
            handleSort,
            renderSortIcon,
            renderTable,
            CheckAllAction
        } = this;

        const headerKeys = Object.keys(datum);

        const headers = headerKeys.map(value =>
            value === 'actions' ? ' ' : value
        );

        const hasActions = headerKeys.includes('actions');

        const hasCheckAction = hasActions
            ? !!Object.prototype.hasOwnProperty.call(
                  datum.actions,
                  'checkAction'
              )
            : false;

        const actionDecrement =
            hasActions || (handleEditModal && handleEditModal !== void 0)
                ? 1
                : 0;

        return (
            <Fragment>
                {!data.length ? (
                    <div className={c.nullRoot}>
                        <Typography variant='subtitle2'>
                            {noResultsText}
                        </Typography>
                    </div>
                ) : (
                    <MuiTable className={c.root}>
                        <TableHead>
                            <TableRow className={clsx(c.row, c.header)}>
                                {headers.map((header, index) => {
                                    const unitWidth = 8 * 8;
                                    const headerWidth = header.includes(
                                        'Reference'
                                    )
                                        ? unitWidth * 1.5
                                        : unitWidth * 2;
                                    const len = headers.length;

                                    return (
                                        <TableCell
                                            className={clsx(
                                                index === len - actionDecrement
                                                    ? c.actionCellHeader
                                                    : c.cellHeader,
                                                c.cell
                                            )}
                                            style={{
                                                maxWidth: headerWidth,
                                                minWidth: headerWidth
                                            }}
                                            key={index}
                                            onClick={() =>
                                                index < len - actionDecrement &&
                                                handleSort(index)
                                            }
                                        >
                                            {header}
                                            {index < len - actionDecrement &&
                                                renderSortIcon(index)}
                                            {index === len - actionDecrement &&
                                                hasCheckAction && (
                                                    <CheckAllAction
                                                        onClick={checkAll}
                                                        dataLength={data.length}
                                                    />
                                                )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody className={c.body}>
                            {renderTable(c)}
                        </TableBody>
                    </MuiTable>
                )}
            </Fragment>
        );
    }
}

Table.defaultProps = {
    itemsPerPage: 10,
    noResultsText: 'No results'
};

Table.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    filter: PropTypes.string,
    itemsPerPage: PropTypes.number
};

const _Table = withStyles(styles)(Table);

export { _Table as default, _Table as Table };
