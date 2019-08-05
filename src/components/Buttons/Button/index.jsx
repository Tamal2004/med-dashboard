import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { CircularLoader } from 'components';
import { Button as MaterialButton } from '@material-ui/core';

import { styles } from './styles';

function ButtonInput(props) {
    const {
        classes,
        disabled = false,
        isLoading = false,
        onClick = () => {},
        category = 'primary',
        ...rest
    } = props;
    // Todo: size = lg md sm
    // Todo: variant override = primary, success, default

    let rootClass = null;
    let disabledClass = null;
    let text = '';
    switch (category) {
        case 'primary':
            rootClass = 'nextButton';
            disabledClass = 'disabledNextButton';
            text = 'Publish to Database';
            break;
        case 'primaryNext':
            rootClass = 'nextButton';
            disabledClass = 'disabledNextButton';
            text = 'Next';
            break;
        case 'secondary':
            rootClass = 'saveDraft';
            disabledClass = 'saveDraftDisabled';
            text = 'Save Drafts';
            break;
        case 'publish-md':
            rootClass = 'publishButton';
            disabledClass = 'disabledPublishButton';
            text = 'Publish to Database';
            break;
        case 'default':
            text = 'Handover';
            break;
        default:
            break;
    }

    return (
        <MaterialButton
            variant='contained'
            disabled={disabled}
            onClick={onClick}
            classes={{
                root: classes[rootClass],
                disabled: classes[disabledClass],
            }}
            {...rest}
        >
            {isLoading ? <CircularLoader /> : text}
        </MaterialButton>
    );
}

const Button = withStyles(styles)(ButtonInput);

export { Button as default, Button };
