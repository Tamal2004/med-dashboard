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
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import { amendColor } from './variables';
import GreenTick from './assets/img/green-tick.svg';

const styles = theme => ({
    textField: {
        marginBottom: theme.spacing(2.5)
    },
    bgAmendColor: {
        backgroundColor: amendColor
    },
    parentDiv: {
        position: 'relative'
    },
    parentDivWrapper: {
        top: -20,
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        background: '#ffffff',
        display: 'table',
        minWidth: 400,
        minHeight: 200,
        maxHeight: 503,
        position: 'absolute',
        zIndex: '99'
    },
    relativeWrapper: {
        position: 'relative',
        height: 'inherit'
    },
    loadedWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    spotlightContainer: {
        display: 'flex',
        height: 56,
        padding: 10,
        '& > div': {
            flexGrow: 1
        }
    },
    spotLightInputTextField: {
        height: 20,
        fontSize: '.875rem',
        padding: '6px 5px 6px 20px',
        border: '1px solid  #e6e6e6',
        borderRadius: 4
    },
    clearBtn: {
        background: 'transparent'
    },
    resetBtn: {
        minWidth: '20%',
        marginLeft: 5,
        color: '#646464',
        textTransform: 'capitalize',
        border: '1px solid #ececec',
        padding: '0px 5px'
    },
    inputTextField: {
        height: '32px',
        fontSize: '.875rem',
        padding: '6px 15px 7px 20px',
        border: '1px solid  #e6e6e6',
        borderRadius: 4
    },
    inputLabelRoot: {
        color: 'rgba(0, 0, 0, 0.87)',
        position: 'relative'
    },
    inputLabelFocused: {
        color: 'rgba(0, 0, 0, 0.87) !important'
    },
    inputLabelShrank: {
        fontSize: '.875rem',
        transform: 'translate(0, 0px) scale(1.0)',
        lineHeight: '20px',
        '&::after': {
            content: `url(${GreenTick})`,
            marginLeft: 15,
            display: 'none'
        }
    },
    inputHasSuccess: {
        '&::after': {
            display: 'inline-block'
        },
        '& + div > div': {
            borderColor: '#8fc255'
        }
    },
    listWrapper: {
        overflowY: 'auto',
        height: 'calc(100% - 112px)' //considering search and pagination both 56px height
    },
    listStyle: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: 'inherit',
        '& > li': {
            display: 'inline-block',
            verticalAlign: 'top',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }
    },
    listHeader: {
        background: '#e8e8e8',
        textTransform: 'uppercase',
        fontWeight: 500,
        padding: '5px 8px',
        color: '#3c3c3c',
        display: 'flex'
    },
    listItem: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: 'inherit'
    },
    childList: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width: 'inherit',
        color: '#4b4b4c',
        '& > li': {
            display: 'inline-block',
            verticalAlign: 'top',
            overflow: 'hidden',
            wordBreak: 'break-word',
            padding: 2
        },
        '& > .highlight': {
            textTransform: 'initial',
            background: 'yellow'
        }
    },
    columnOfList: {
        padding: '5px 8px',
        borderBottom: '1px solid #e8e8e8',
        '&:hover': {
            background: '#f5f5f5',
            cursor: 'pointer'
        }
    },
    paginationWrapper: {
        padding: '5px 8px',
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    listpaginationTitle: {
        whiteSpace: 'nowrap'
    },
    listpaginationBox: {
        whiteSpace: 'nowrap'
    },
    paginationBtn: {
        minWidth: 'auto',
        lineHeight: 1,
        borderRadius: 0,
        color: '#505050',
        background: '#f7f7f7'
    },
    disabledBtn: {
        background: '#e2e2e2'
    },
    listpagination: {
        marginLeft: 15,
        border: '1px solid #e8e8e8',
        '& > li:not(:first-child)': {
            borderLeft: '1px solid #e8e8e8'
        }
    },
    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
        border: '1px solid #ececec'
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        fontSize: '0.875rem',
        '&:focus': {
            background: 'red'
        }
    },
    iconButton: {
        padding: 3,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    backdrop: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 9
    },
    innerIcon: {
        position: 'absolute',
        right: 0,
        padding: '0px 18px 0px 0px',
        marginTop: -4,
        background: 'transparent',
        '&:hover': {
            background: 'transparent'
        }
    },
    smallIcon: {
        width: 16,
        height: 16
    },
    expandIcon: {
        color: 'hsl(0,0%,80%)',
        '&:hover': {
            color: 'hsl(0,0%,60%)'
        }
    },
    adornmentStyle: {
        marginLeft: 0
    },
    loader: {
        color: '#e6e6e6'
    },
    loaderParent: {
        position: 'absolute',
        left: 1,
        right: 9,
        top: 1,
        bottom: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff'
    }
});

class MultiFields extends PureComponent {
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
        if (this.props.paginationData) {
            this.setPaginateData();
        }
    }

    componentDidUpdate(prevProps) {
        const { paginationData, columnInfo } = this.props;
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
        } = this.props;
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
            const { paginationData, columnInfo } = this.props;
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
        const { paginationData, loadMoreItems } = this.props;
        const { spotSearchKey } = this.state;
        loadMoreItems(spotSearchKey, Number(paginationData.currentPageNo) - 1);
    };

    goPaginationRight = () => {
        const { paginationData, loadMoreItems } = this.props;
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
        this.setState({ openDropdown: false }, () => {
            this.clearSpotLightSearch();
        });
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
            loading,
            action,
            type,
            searchOption,
            pagination,
            label,
            placeholder = 'Select...',
            value = '',
            disabled = false,
            required = false,
            success = false,
            isAmend = false
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
                    className={classNames(
                        classes.textField,
                        isAmend && (value && value.length > 0)
                            ? classes.bgAmendColor
                            : null
                    )}
                    autoFocus={false}
                    disabled={disabled}
                    InputProps={{
                        disableUnderline: true,
                        inputProps: {
                            className: classNames(classes.inputTextField)
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

MultiFields.propTypes = {
    classes: PropTypes.object
};

const SelectFieldMultiple = withStyles(styles)(MultiFields);
export { SelectFieldMultiple as default, SelectFieldMultiple };
