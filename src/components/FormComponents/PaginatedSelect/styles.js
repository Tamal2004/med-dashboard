import GreenTick from 'components/Global/assets/img/green-tick.svg';

export default theme => ({
    textField: {
        paddingTop: theme.spacing.unitPadding,
        paddingBottom: theme.spacing.unitPadding
    },
    bgAmendColor: {
        backgroundColor: 'rgb(255,255,153)',
    },
    parentDiv: {
        position: 'relative',
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
        zIndex: '99',
    },
    relativeWrapper: {
        position: 'relative',
        height: 'inherit',
    },
    loadedWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    spotlightContainer: {
        display: 'flex',
        height: 56,
        padding: 10,
        '& > div': {
            flexGrow: 1,
        },
    },
    spotLightInputTextField: {
        height: 20,
        fontSize: '.875rem',
        padding: '6px 5px 6px 20px',
        border: '1px solid  #e6e6e6',
        borderRadius: 4,
    },
    clearBtn: {
        background: 'transparent',
    },
    resetBtn: {
        minWidth: '20%',
        marginLeft: 5,
        color: '#646464',
        textTransform: 'capitalize',
        border: '1px solid #ececec',
        padding: '0px 5px',
    },
    inputTextField: {
        height: '32px',
        fontSize: '.875rem',
        padding: '6px 15px 7px 20px',
        border: '1px solid',
        borderColor: theme.palette.grey[300],
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            borderColor: theme.palette.grey[400],
        }
    },
    inputLabelRoot: {
        color: 'rgba(0, 0, 0, 0.87)',
        position: 'relative',
    },
    inputLabelFocused: {
        color: 'rgba(0, 0, 0, 0.87) !important',
    },
    inputLabelShrank: {
        fontSize: '.975rem',
        transform: 'translate(0, 0px) scale(1.0)',
        lineHeight: `${theme.spacing.unitPadding}px`,
        marginBottom: 2,
        '&::after': {
            content: `url(${GreenTick})`,
            marginLeft: 15,
            display: 'none',
        },
    },
    inputHasSuccess: {
        '&::after': {
            display: 'inline-block',
        },
        '& + div > div': {
            borderColor: '#8fc255',
        },
    },
    listWrapper: {
        overflowY: 'auto',
        height: 'calc(100% - 112px)', //considering search and pagination both 56px height
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
            overflow: 'hidden',
        },
    },
    listHeader: {
        background: '#e8e8e8',
        textTransform: 'uppercase',
        fontWeight: 500,
        padding: '5px 8px',
        color: '#3c3c3c',
        display: 'flex',
    },
    listItem: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: 'inherit',
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
            padding: 2,
        },
        '& > .highlight': {
            textTransform: 'initial',
            background: 'yellow',
        },
    },
    columnOfList: {
        padding: '5px 8px',
        borderBottom: '1px solid #e8e8e8',
        '&:hover': {
            background: '#f5f5f5',
            cursor: 'pointer',
        },
    },
    paginationWrapper: {
        padding: '5px 8px',
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    listpaginationTitle: {
        whiteSpace: 'nowrap',
    },
    listpaginationBox: {
        whiteSpace: 'nowrap',
    },
    paginationBtn: {
        minWidth: 'auto',
        lineHeight: 1,
        borderRadius: 0,
        color: '#505050',
        background: '#f7f7f7',
    },
    disabledBtn: {
        background: '#e2e2e2',
    },
    listpagination: {
        marginLeft: 15,
        border: '1px solid #e8e8e8',
        '& > li:not(:first-child)': {
            borderLeft: '1px solid #e8e8e8',
        },
    },
    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
        border: '1px solid #ececec',
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        fontSize: '0.875rem',
        '&:focus': {
            background: 'red',
        },
    },
    iconButton: {
        padding: 3,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    backdrop: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 9,
    },
    innerIcon: {
        position: 'absolute',
        right: 0,
        padding: '0px 18px 0px 0px',
        marginTop: -4,
        background: 'transparent',
        '&:hover': {
            background: 'transparent',
        },
    },
    smallIcon: {
        width: 16,
        height: 16,
    },
    expandIcon: {
        color: 'hsl(0,0%,80%)',
        '&:hover': {
            color: 'hsl(0,0%,60%)',
        },
    },
    adornmentStyle: {
        marginLeft: 0,
    },
    loader: {
        color: '#e6e6e6',
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
        background: '#fff',
    },
    success: {
        borderColor: theme.palette.success.primary,
        '&:hover': {
            borderColor: theme.palette.success.hover,
        }
    }
});