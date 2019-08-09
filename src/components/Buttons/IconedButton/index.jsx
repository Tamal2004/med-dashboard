import React from 'react';
import PropTypes from 'prop-types';

// Material
import { Button } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';

const IconedButton = ({ Icon, children, ...props }) => {
    const c = useStyles();
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
    variant: 'outlined'
};

IconedButton.propTypes = {
    Icon: PropTypes.any.isRequired
};

export { IconedButton as default, IconedButton };
