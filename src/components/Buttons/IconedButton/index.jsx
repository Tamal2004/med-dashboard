import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

// Material
import { Button } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired, composeClasses } from 'libs';

const IconedButton = ({ styles, Icon, children, ...props }) => {
    const c = composeClasses({ classes: useStyles(), styles });
    const color = props.disabled ? 'disabled' : props.color;
    return (
        <Button className={c.root} {...props}>
            <Icon color={color} className={c.icon} />
            {children}
        </Button>
    );
};

IconedButton.defaultProps = {
    color: 'primary',
    variant: 'outlined',
    children: <Fragment/>
};

IconedButton.propTypes = {
    Icon: PropTypes.any.isRequired
};

export { IconedButton as default, IconedButton };
