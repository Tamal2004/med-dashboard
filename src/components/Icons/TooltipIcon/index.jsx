import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';

import { Icon, Tooltip } from 'components';
import styles from './styles';

/*
 * Domain: Reports
 * Page: Toolbar
 * Component: Icon
 * Type: --
 * TooltipIcon
 */
const TooltipIcon = ({
    classes: { icon, container, disabledStyle },
    className,
    title,
    onClick,
    disabled,
    Icon: IconComponent // Pascal Case --> Component
}) => (
    <Tooltip title={title}>
        <div className={container}>
            <ButtonBase
                disabled={disabled}
                classes={{ root: icon, disabled: disabledStyle }}
                onClick={onClick}
            >
                <Icon className={className} disabled={disabled}>
                    <IconComponent />
                </Icon>
            </ButtonBase>
        </div>
    </Tooltip>
);

const _TooltipIcon = withStyles(styles)(TooltipIcon);

export {
    _TooltipIcon as default,
    _TooltipIcon as TooltipIcon
};
