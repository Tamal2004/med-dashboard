import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AccordionExpandIcon from '@material-ui/icons/ArrowDropDown';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpansionPanel from './ExpansionPanel';
import { SearchExpansionPanelSummary } from './ExpansionPanelSummary';
import { AccordionConsumer } from './context';
import styles from './styles';

const ExpandIcon = () => (
    <SvgIcon fontSize='small' color='primary'>
        <AccordionExpandIcon />
    </SvgIcon>
);

class SearchAccordionPanel extends Component {
    render() {
        const {
            classes,
            tag,
            title,
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
                        <SearchExpansionPanelSummary
                            aria-controls={expandAria}
                            id={expandId}
                            expandIcon={<ExpandIcon />}
                        >
                            {title}
                        </SearchExpansionPanelSummary>
                        <ExpansionPanelDetails
                            classes={{ root: classes.expansionPanelroot }}
                        >
                            {children}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )}
            </AccordionConsumer>
        );
    }
}

SearchAccordionPanel.defaultProps = {
    tag: '',
    title: '',
    children: ''
};

SearchAccordionPanel.propTypes = {
    depth: PropTypes.number,
    title: PropTypes.string
};

const _SearchAccordionPanel = withStyles(styles)(SearchAccordionPanel);

export {
    _SearchAccordionPanel as default,
    _SearchAccordionPanel as SearchAccordionPanel
};
