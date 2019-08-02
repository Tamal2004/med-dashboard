import { makeStyles } from '@material-ui/core';

export default makeStyles(({ spacing, shadows }) => ({
    root: {
        height: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        width: 640,
        height: 600,
        boxShadow: shadows[6],
        paddingTop: 40
    },
    controlLabel: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 60
    },
    controlInput: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: 60
    },
    label: {
        paddingLeft: spacing(3)
    },
    input: {}
}));
