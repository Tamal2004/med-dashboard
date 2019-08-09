import { amendColor } from 'components/Global/variables';

export default theme => ({
    textField: {
        marginBottom: theme.spacing(2.5)
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
        lineHeight: '20px'
    },
    inputLabelDate: {
        '& + div': {
            marginTop: 16,
            border: '1px solid  #e6e6e6',
            borderRadius: 4,
            paddingLeft: 20
        }
    },
    inputTextFieldDate: {
        height: '32px',
        fontSize: '.875rem',
        padding: '8px 0 5px'
    },
    bgAmendColor: {
        '& + div': {
            backgroundColor: amendColor
        }
    }
});
