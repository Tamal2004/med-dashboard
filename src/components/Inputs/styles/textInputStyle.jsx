import { amendColor } from 'components/Global/variables';
import GreenTick from 'components/Global/assets/img/green-tick.svg';

export default theme => ({
    textField: {
        marginBottom: 16,
    },
    textArea: {
        border: '1px solid #e6e6e6',
        borderRadius: '4px',
        padding: '6px 15px 7px',
        minHeight: 129,
        fontSize: '.875rem',
    },
    inputTextAreaField: {
        padding: 0,
    },
    inputTextField: {
        height: 47,
        fontSize: '.875rem',
        padding: '6px 15px 7px 20px',
        border: '1px solid  #e6e6e6',
        borderRadius: 4,
    },
    inputLabelRoot: {
        color: 'rgba(0, 0, 0, 0.87)',
        position: 'relative',
    },
    inputLabelFocused: {
        color: 'rgba(0, 0, 0, 0.87) !important',
    },
    inputLabelShrank: {
        fontSize: '.875rem',
        transform: 'translate(0, 0px) scale(1.0)',
        lineHeight: '20px',
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
    inputHasError: {
        borderColor: '#eb5151',
    },
    disabledTextField: {
        height: 47,
        fontSize: '.875rem',
        padding: '6px 0 7px 20px;',
        border: '1px solid  #e6e6e6',
        borderRadius: 4,
        backgroundColor: '#f5f5f5',
    },
    bgAmendColor: {
        backgroundColor: amendColor,
    },
});
