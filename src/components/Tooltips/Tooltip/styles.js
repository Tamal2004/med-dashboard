import arrowGenerator from './arrowGenerator';

export default theme => ({
    arrow: {
        position: 'absolute',
        border: '1px solid rgab(0, 0, 0, .1)',
        fontSize: 6,
        boxShadow: '0px 3px 21px 0px rgba(0, 4, 52, 0.11)',
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid'
        }
    },
    popperLight: arrowGenerator(theme.palette.common.white),
    popperDark: arrowGenerator(theme.palette.common.black),
    tooltipLight: {
        boxShadow: '0px 0px 7px 0px rgba(0, 2, 53, 0.29)',
        color: theme.palette.common.black,
        borderRadius: 0,
        backgroundColor: theme.palette.common.white,
        padding: '6px 10px',
        fontSize: '.9rem'
    },
    tooltipDark: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black
    }
});
