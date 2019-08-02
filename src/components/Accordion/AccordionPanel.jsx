import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpansionPanel from './ExpansionPanel';
import ExpansionPanelDetails from './ExpansionPanelDetails';
import { ExpansionPanelSummary } from './ExpansionPanelSummary';
import { AccordionConsumer } from './context';
import styles from './styles';

const ExpandIcon = () => (
    <SvgIcon fontSize='small' color='primary'>
        <NavigateNextIcon />
    </SvgIcon>
);

class AccordionPanel extends Component {
    render() {
        const {
            classes,
            tag,
            title,
            icon,
            depth,
            reverse,
            children,
            ...restProps
        } = this.props;

        const expandId = `id-${tag}`;
        const expandAria = `content-${tag}`;

        return (
            <AccordionConsumer>
                {({ expandedId, handleChange }) => (
                    <ExpansionPanel
                        square
                        expanded={expandedId === tag}
                        onChange={() => handleChange(tag)}
                        {...restProps}
                    >
                        <ExpansionPanelSummary
                            aria-controls={expandAria}
                            id={expandId}
                            expandIcon={<ExpandIcon />}
                        >
                            {icon ? (
                                <div className={classes.iconPadding}>
                                    <SvgIcon fontSize='default' color='action'>
                                        {icon}
                                    </SvgIcon>
                                </div>
                            ) : null}
                            {title}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {children}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )}
            </AccordionConsumer>
        );
    }
}

AccordionPanel.defaultProps = {
    tag: '',
    title: '',
    children: '',
    depth: 1,
    icon: null
};

AccordionPanel.propTypes = {
    depth: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.node
};

const _AccordionPanel = withStyles(styles)(AccordionPanel);

export { _AccordionPanel as default, _AccordionPanel as AccordionPanel };
