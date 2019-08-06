const styles = theme => ({
    saveDraft: {
        boxShadow: 'none',
        minWidth: '100px',
        height: theme.spacing.unit * 4.5,
        color: 'white',
        backgroundColor: '#8fc355',
        borderColor: '#8fc355',
        '&:hover': {
            backgroundColor: '#8fc355',
            borderColor: '#8fc355'
        },
        '&.active': {
            backgroundColor: '#8fc355',
            borderColor: '#8fc355',
            opacity: '1'
        }
    },
    saveDraftDisabled: {
        color: '#ffffff !important',
        backgroundColor: '#c1dba4 !important'
    },
    nextButton: {
        boxShadow: 'none',
        minWidth: '370px',
        height: '45px',
        color: 'white',
        margin: '50px auto -21px',
        display: 'block',
        backgroundColor: '#387ff5',
        borderColor: '#387ff5',
        '&:hover': {
            backgroundColor: '#387ff5',
            borderColor: '#387ff5'
        },
        '&:active': {
            backgroundColor: '#387ff5',
            borderColor: '#387ff5'
        }
    },
    disabledNextButton: {
        color: '#ffffff !important',
        backgroundColor: '#96baf5 !important'
    },
    handoverButton: {
        marginTop: '6px',
        textTransform: 'none',
        boxShadow: 'none',
        minWidth: '100px',
        height: '35px',
        color: 'white',
        backgroundColor: '#000000',
        borderColor: '#000000',
        '&:hover': {
            backgroundColor: '#000000',
            borderColor: '#000000'
        },
        '&.active': {
            backgroundColor: '#000000',
            borderColor: '#000000'
        }
    },

    publishButton: {
        marginTop: '6px',
        marginLeft: '10px',
        textTransform: 'none',
        boxShadow: 'none',
        minWidth: '170px',
        height: '35px',
        color: 'white',
        backgroundColor: '#387ff5',
        borderColor: '#387ff5',
        '&:hover': {
            backgroundColor: '#387ff5',
            borderColor: '#387ff5'
        },
        '&.active': {
            backgroundColor: '#387ff5',
            borderColor: '#387ff5',
            opacity: '1'
        }
    },
    disabledPublishButton: {
        color: '#ffffff !important',
        backgroundColor: '#96baf5 !important'
    }
});

export { styles as default, styles };
