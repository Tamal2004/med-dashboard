/*
 * ======================
 * == PARAMETER FORMAT ==
 * ======================
 *
 * searchOption={true} //true or false
 * pagination={true} //true or false
 * rowInColumnWidth={[50, 50]} //width of each column
 * paginationData={{'currentPageData': 20, 'currentPageNo':1, 'nextPage':"Yes", 'previousPage':"No", 'totalData':10951, 'totalPages':504}} //pagination data format
 * columnHeader={['Sample Reference', 'Status']} //same no of column as rowInColumnWidth
 * columnInfo={
 *   [
 *     [{'title': 'PYJHJM-P-07000', 'value': 'PYJHJM-P-07000-v'}, {'title': 'Complete', 'value': 'PYJHJM-P-07000-v'}],
 *     [{'title': 'PYJHJM-P-07001', 'value': 'PYJHJM-P-07001-v'}, {'title': 'Incomplete', 'value': 'PYJHJM-P-07001-v'}]
 *   ]
 * } //same no of column as rowInColumnWidth. value should be same on each object for each column (have to fix this to a single value field)
 * action={(type)=> callMethod()} //callback action to set value to state
 * loadMoreItems={ (param)=> loadMore(param) } //load more items
 * label="Test label"
 * placeholder="sample placeholder"
 * value="value 00"
 * type='testType' //redux key
 *
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// Local
import styles from './styles';

// Selectors
import { selectAmendedField } from 'selectors';


class PaginatedSelect extends PureComponent {
    state = {
        openDropdown: false,
        rowInColumnWidth: null,
        columnHeader: null,
        columnInfo: null,
        paginationData: null,
        showSequenceFirstPage: 0,
        showSequenceLastPage: 0,
        noDot: false,
        noDataFound: false,
        spotSearchKey: ''
    };

    componentDidMount() {
        if (this.props.data.paginationData) {
            this.setPaginateData();
        }
    }

    componentDidUpdate(prevProps) {
        const { paginationData, columnInfo } = this.props.data;
        if (paginationData && prevProps.paginationData) {
            if (
                Number(paginationData['currentPageNo']) !==
                    Number(prevProps.paginationData['currentPageNo']) ||
                columnInfo.length !== prevProps.columnInfo.length
            ) {
                this.setPaginateData();
            }
        } else {
            if (paginationData && paginationData !== prevProps.paginationData) {
                this.setPaginateData();
            } else if (!this.state.noDataFound) {
                this.setState({ noDataFound: true });
            }
        }
    }

    setPaginateData = () => {
        const {
            rowInColumnWidth,
            columnHeader,
            columnInfo,
            paginationData
        } = this.props.data;
        const totalPages = Number(paginationData.totalPages);
        let currentPage = Number(paginationData.currentPageNo);
        let noDotEnable = false;
        let firstPage = currentPage;
        let lastPage = firstPage + 4;

        //before currentpage
        if (currentPage === 2 || currentPage === 3) {
            firstPage = 1;
        } else if (currentPage > 3) {
            firstPage = currentPage - 2;
            lastPage = currentPage + 2;
        }

        //after currentpage
        if (lastPage === totalPages) {
            lastPage = totalPages - 1;
        } else if (lastPage > totalPages) {
            lastPage = lastPage - (lastPage - totalPages) - 1;
        }

        //dot on last page
        if (totalPages - lastPage > 1) {
            noDotEnable = true;
        }

        this.setState({
            rowInColumnWidth: rowInColumnWidth,
            columnHeader: columnHeader,
            columnInfo: columnInfo,
            paginationData: paginationData,
            showSequenceFirstPage: firstPage,
            showSequenceLastPage: lastPage,
            noDot: noDotEnable,
            noDataFound: false
        });
    };

    handleSpotlightSearch = e => {
        this.setState({ spotSearchKey: e.target.value }, () => {
            this.changePagination(1);
        });
    };

    clearSpotLightSearch = () => {
        this.setState({ spotSearchKey: '' }, () => {
            const { paginationData, columnInfo } = this.props.data;
            if (
                paginationData &&
                (Number(paginationData.currentPageNo) !== 1 ||
                    columnInfo.length < 10)
            ) {
                //if currentpage number exist and is not the first page
                this.changePagination(1);
            } else if (!paginationData) {
                //if currentpage number not exist
                this.changePagination(1);
            }
        });
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSpotlightSearch(e);
        }
    };

    getPaginationElements = () => {
        const {
            showSequenceFirstPage,
            showSequenceLastPage,
            paginationData
        } = this.state;
        const { classes } = this.props;
        const pagination = [];
        for (let i = showSequenceFirstPage - 1; i < showSequenceLastPage; i++) {
            pagination.push(
                <li key={i}>
                    <Button
                        onClick={() => this.changePagination(i + 1)}
                        data-index={i + 1}
                        disabled={
                            Number(paginationData.currentPageNo) === i + 1
                                ? true
                                : false
                        }
                        classes={{
                            root: classes.paginationBtn,
                            disabled: classes.disabledBtn
                        }}
                    >
                        {i + 1}
                    </Button>
                </li>
            );
        }
        return pagination;
    };

    getHighlight = text => {
        let { spotSearchKey } = this.state;
        let htext = text;
        if (spotSearchKey.length > 0 && text) {
            spotSearchKey = spotSearchKey.replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
            );
            let matched = new RegExp(spotSearchKey, 'gi');
            htext = text.replace(matched, `<mark>$&</mark>`);
        }

        return { __html: htext };
    };

    goPaginationLeft = () => {
        const { data: {paginationData}, loadMoreItems } = this.props;
        const { spotSearchKey } = this.state;
        loadMoreItems(spotSearchKey, Number(paginationData.currentPageNo) - 1);
    };
    goPaginationRight = () => {
        const { data: { paginationData}, loadMoreItems } = this.props;
        const { spotSearchKey } = this.state;
        loadMoreItems(spotSearchKey, Number(paginationData.currentPageNo) + 1);
    };
    changePagination = (pageNo = 1) => {
        const { spotSearchKey } = this.state;
        this.props.loadMoreItems(spotSearchKey, Number(pageNo));
    };

    setValue = param => {
        this.props.action(param);
        this.closeDropdown();
    };

    openDropdown = () => {
        this.setState({ openDropdown: true });
    };

    closeDropdown = () => {
        this.setState({ openDropdown: false });
    };

    render() {
        const {
            openDropdown,
            rowInColumnWidth,
            columnHeader,
            columnInfo,
            paginationData,
            noDot,
            spotSearchKey,
            noDataFound
        } = this.state;
        let {
            classes,
            loading = false,
            action,
            type,
            searchOption = true,
            pagination = true,
            label,
            placeholder = 'Select...',
            value = '',
            disabled = false,
            required,
            success = false,
            amended: isAmend
        } = this.props;

        value = value ? value : '';
        return (
            <React.Fragment>
                {openDropdown &&
                (rowInColumnWidth && rowInColumnWidth.length > 0) &&
                (columnHeader && columnHeader.length > 0) &&
                (columnInfo && columnInfo.length > 0) ? (
                    <Typography
                        component='div'
                        className={classes.backdrop}
                        onClick={() => this.closeDropdown()}
                    />
                ) : null}
                <TextField
                    fullWidth
                    label={label}
                    type='text'
                    required={required}
                    className={classes.textField}
                    autoFocus={false}
                    disabled={disabled}
                    InputProps={{
                        disableUnderline: true,
                        inputProps: {
                            className: classNames(
                                classes.inputTextField,
                                isAmend && classes.bgAmendColor,
                                success && classes.success
                            )
                        },
                        endAdornment: (
                            <InputAdornment
                                className={classes.adornmentStyle}
                                position='end'
                            >
                                {loading &&
                                !openDropdown &&
                                value.length <= 0 ? (
                                    <Typography
                                        component='div'
                                        className={classes.loaderParent}
                                    >
                                        <CircularProgress
                                            size='25px'
                                            className={classes.loader}
                                        />
                                    </Typography>
                                ) : null}
                                <IconButton
                                    aria-label='Clear value'
                                    className={classes.innerIcon}
                                    disableRipple={true}
                                    onClick={e =>
                                        value.length > 0
                                            ? action({ type: type, value: '' })
                                            : this.openDropdown()
                                    }
                                >
                                    {value.length > 0 ? (
                                        <ClearIcon
                                            className={classes.smallIcon}
                                        />
                                    ) : (
                                        <ExpandMoreIcon
                                            className={classes.expandIcon}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.inputLabelRoot,
                            focused: classes.inputLabelFocused,
                            shrink: success
                                ? classNames(
                                      classes.inputLabelShrank,
                                      classes.inputHasSuccess
                                  )
                                : classNames(classes.inputLabelShrank)
                        }
                    }}
                    placeholder={placeholder}
                    value={
                        typeof value === 'object'
                            ? value.hasOwnProperty('title')
                                ? value.title
                                : value.label
                            : value
                    }
                    onFocus={() => this.openDropdown()}
                />
                {openDropdown &&
                (rowInColumnWidth && rowInColumnWidth.length > 0) &&
                (columnHeader && columnHeader.length > 0) &&
                (columnInfo && columnInfo.length > 0) ? (
                    <Typography component='div' className={classes.parentDiv}>
                        <Typography
                            component='div'
                            className={classes.parentDivWrapper}
                            style={{ width: rowInColumnWidth.length * 120 }}
                        >
                            <Typography
                                component='div'
                                className={classNames(
                                    classes.relativeWrapper,
                                    loading && classes.loadedWrapper
                                )}
                            >
                                {loading ? (
                                    <CircularProgress size='25px' />
                                ) : (
                                    <React.Fragment>
                                        <React.Fragment>
                                            {searchOption ? (
                                                <Typography
                                                    component='div'
                                                    className={
                                                        classes.spotlightContainer
                                                    }
                                                >
                                                    <Paper
                                                        className={
                                                            classes.searchRoot
                                                        }
                                                        elevation={1}
                                                    >
                                                        <IconButton
                                                            className={
                                                                classes.iconButton
                                                            }
                                                            aria-label='Search'
                                                        >
                                                            <SearchIcon />
                                                        </IconButton>
                                                        <InputBase
                                                            className={
                                                                classes.searchInput
                                                            }
                                                            placeholder='Spotlight search'
                                                            autoFocus={true}
                                                            onChange={e =>
                                                                this.handleSpotlightSearch(
                                                                    e
                                                                )
                                                            }
                                                            onKeyPress={e =>
                                                                this.handleKeyPress(
                                                                    e
                                                                )
                                                            }
                                                            value={
                                                                spotSearchKey
                                                            }
                                                        />
                                                        {spotSearchKey.length >
                                                        0 ? (
                                                            <IconButton
                                                                color='primary'
                                                                className={
                                                                    classes.clearBtn
                                                                }
                                                                disableRipple={
                                                                    true
                                                                }
                                                                aria-label='Directions'
                                                                onClick={() =>
                                                                    this.clearSpotLightSearch()
                                                                }
                                                            >
                                                                <ClearIcon
                                                                    className={
                                                                        classes.smallIcon
                                                                    }
                                                                />
                                                            </IconButton>
                                                        ) : null}
                                                    </Paper>
                                                    <Button
                                                        classes={{
                                                            root:
                                                                classes.resetBtn
                                                        }}
                                                        onClick={() =>
                                                            this.changePagination(
                                                                1
                                                            )
                                                        }
                                                    >
                                                        Reset Page
                                                    </Button>
                                                </Typography>
                                            ) : null}
                                        </React.Fragment>

                                        {noDataFound ? (
                                            <Typography
                                                component='div'
                                                className={
                                                    classes.loadedWrapper
                                                }
                                            >
                                                NO DATA FOUND!
                                            </Typography>
                                        ) : (
                                            <React.Fragment>
                                                <React.Fragment>
                                                    <Typography
                                                        component='div'
                                                        className={
                                                            classes.listWrapper
                                                        }
                                                    >
                                                        {/* HEADER */}
                                                        <ul
                                                            className={classNames(
                                                                classes.listStyle,
                                                                classes.listHeader
                                                            )}
                                                        >
                                                            {columnHeader &&
                                                                columnHeader.map(
                                                                    (
                                                                        hitem,
                                                                        hindex
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                hindex
                                                                            }
                                                                            style={{
                                                                                width:
                                                                                    rowInColumnWidth[
                                                                                        hindex
                                                                                    ] +
                                                                                    '%'
                                                                            }}
                                                                        >
                                                                            {
                                                                                hitem
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                        </ul>

                                                        {/* ITEM LIST */}
                                                        <ul
                                                            className={classNames(
                                                                classes.listItem
                                                            )}
                                                        >
                                                            {columnInfo &&
                                                                columnInfo.map(
                                                                    (
                                                                        iitem,
                                                                        iindex
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                iindex
                                                                            }
                                                                            className={classNames(
                                                                                classes.columnOfList
                                                                            )}
                                                                        >
                                                                            <ul
                                                                                className={classNames(
                                                                                    classes.childList
                                                                                )}
                                                                            >
                                                                                {iitem.map(
                                                                                    (
                                                                                        childItem,
                                                                                        childIndex
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                childIndex
                                                                                            }
                                                                                            style={{
                                                                                                width:
                                                                                                    rowInColumnWidth[
                                                                                                        childIndex
                                                                                                    ] +
                                                                                                    '%'
                                                                                            }}
                                                                                            onClick={e =>
                                                                                                this.setValue(
                                                                                                    {
                                                                                                        type: type,
                                                                                                        value: childItem
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            dangerouslySetInnerHTML={this.getHighlight(
                                                                                                childItem.title
                                                                                            )}
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </li>
                                                                    )
                                                                )}
                                                        </ul>
                                                    </Typography>
                                                </React.Fragment>

                                                <React.Fragment>
                                                    {pagination &&
                                                    paginationData ? (
                                                        <Typography
                                                            component='div'
                                                            className={
                                                                classes.paginationWrapper
                                                            }
                                                        >
                                                            <Typography
                                                                component='div'
                                                                className={
                                                                    classes.listpaginationTitle
                                                                }
                                                            >
                                                                {' '}
                                                                Page{' '}
                                                                {
                                                                    paginationData.currentPageNo
                                                                }{' '}
                                                                of{' '}
                                                                {
                                                                    paginationData.totalPages
                                                                }{' '}
                                                                (
                                                                {
                                                                    paginationData.totalData
                                                                }{' '}
                                                                items){' '}
                                                            </Typography>
                                                            <Typography
                                                                component='div'
                                                                className={
                                                                    classes.listpaginationBox
                                                                }
                                                            >
                                                                <ul
                                                                    className={classNames(
                                                                        classes.listStyle,
                                                                        classes.listpagination
                                                                    )}
                                                                >
                                                                    <li>
                                                                        <Button
                                                                            disabled={
                                                                                paginationData.previousPage
                                                                                    .toLowerCase()
                                                                                    .trim() ===
                                                                                'yes'
                                                                                    ? false
                                                                                    : true
                                                                            }
                                                                            classes={{
                                                                                root:
                                                                                    classes.paginationBtn,
                                                                                disabled:
                                                                                    classes.disabledBtn
                                                                            }}
                                                                            onClick={() =>
                                                                                this.goPaginationLeft()
                                                                            }
                                                                        >
                                                                            &#171;
                                                                        </Button>
                                                                    </li>
                                                                    {this.getPaginationElements()}
                                                                    <li>
                                                                        <Button
                                                                            data-index={
                                                                                paginationData.totalPages
                                                                            }
                                                                            onClick={() =>
                                                                                this.changePagination(
                                                                                    paginationData.totalPages
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                Number(
                                                                                    paginationData.currentPageNo
                                                                                ) ===
                                                                                paginationData.totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            classes={{
                                                                                root:
                                                                                    classes.paginationBtn,
                                                                                disabled:
                                                                                    classes.disabledBtn
                                                                            }}
                                                                        >
                                                                            {noDot ? (
                                                                                <span>
                                                                                    ...
                                                                                </span>
                                                                            ) : null}
                                                                            {
                                                                                paginationData.totalPages
                                                                            }
                                                                        </Button>
                                                                    </li>
                                                                    <li>
                                                                        <Button
                                                                            disabled={
                                                                                paginationData.nextPage
                                                                                    .toLowerCase()
                                                                                    .trim() ===
                                                                                'yes'
                                                                                    ? false
                                                                                    : true
                                                                            }
                                                                            classes={{
                                                                                root:
                                                                                    classes.paginationBtn,
                                                                                disabled:
                                                                                    classes.disabledBtn
                                                                            }}
                                                                            onClick={() =>
                                                                                this.goPaginationRight()
                                                                            }
                                                                        >
                                                                            &#187;
                                                                        </Button>
                                                                    </li>
                                                                </ul>
                                                            </Typography>
                                                        </Typography>
                                                    ) : null}
                                                </React.Fragment>
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                )}
                            </Typography>
                        </Typography>
                    </Typography>
                ) : null}
            </React.Fragment>
        );
    }
}

PaginatedSelect.propTypes = {
    classes: PropTypes.object
};

const mapState = (state, { fieldName }) => ({
    amended: selectAmendedField(state, fieldName)
});

const _PaginatedSelect = compose(
    connect(mapState),
    withStyles(styles)
)(PaginatedSelect);

export { _PaginatedSelect as default, _PaginatedSelect as PaginatedSelect };
