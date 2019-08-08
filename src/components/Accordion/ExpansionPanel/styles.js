export default ({ spacing, palette, shape }) => ({
    root: {
        border: 'none',
        boxShadow: 'none',
        margin: 0,
        '&:not(:first-child)': {
            margin: 0
        },
        '&:not(:last-child)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: '0px'
        }
    },
    distance: {
        '&:not(:last-child)': {
            marginBottom: 10
        }
    },
    expanded: {
        margin: '0px'
    },
    distanceExpanded: {
        marginBottom: 10
    },
    border: {
        border: '1px solid',
        borderColor: palette.grey[200]
    }
});
