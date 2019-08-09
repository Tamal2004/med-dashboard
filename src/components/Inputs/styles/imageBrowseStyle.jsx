import GreenTick from 'components/Global/assets/img/green-tick.svg';

export default theme => ({
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
    labelFileFieldCad: {
        '& + div': {
            position: 'absolute',
            top: 30,
            '& > input': {
                minHeight: 180,
                cursor: 'pointer',
                opacity: 0
            }
        }
    },
    customLabel: {
        fontWeight: 'bold',
        height: 35,
        lineHeight: '35px'
    },
    browseButton: {
        width: '80px',
        textTransform: 'capitalize',
        marginLeft: 15,
        borderLeft: '1px solid #e6e6e6',
        borderRadius: 0,
        height: 44,
        background:
            'linear-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, .07))'
    },
    browseButtonHTMLLabel: {
        border: '1px solid #e6e6e6',
        borderRadius: 4,
        marginTop: 10,
        display: 'block'
    },
    browseButtonImageWrapper: {
        position: 'relative',
        minHeight: 200
    },
    browseButtonUploadedImage: {
        padding: 30,
        textAlign: 'center',
        '& img': {
            maxHeight: 140,
            maxWidth: '100%'
        },
        '& > p': {
            display: 'block',
            lineHeight: '20px'
        }
    },
    browseButtonPlaceholder: {
        lineHeight: '200px',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#aeaeae',
        fontSize: '1.5rem'
    },
    browseButtonRoot: {
        borderTop: '1px solid #e6e6e6',
        height: 45,
        cursor: 'pointer',
        marginTop: -10,
        display: 'flex'
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(),
        right: theme.spacing(),
        backgroundColor: theme.palette.background.paper
    },
    fileListLabel: {
        color: '#aeaeae',
        width: 'calc(100% - 95px)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: 45,
        flexGrow: 1,
        lineHeight: '45px',
        paddingLeft: 15,
        '& span:not(:first-child):before': {
            content: '", "'
        }
    }
});
