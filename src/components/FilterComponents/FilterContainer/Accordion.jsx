import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, SearchAccordionPanel } from 'components';

const FilterBlock = ({ children, ...restProps }) => {
	return <Accordion {...restProps}>{children}</Accordion>;
};

const FilterItem = ({ children, ...restProps }) => {
	return (
		<SearchAccordionPanel reverse={true} {...restProps}>
			{children}
		</SearchAccordionPanel>
	);
};

const AccordionFilterContainer = ({ tag, title, children }) => {
	return (
		<FilterBlock>
			<FilterItem tag={tag} title={title}>
				{children}
			</FilterItem>
		</FilterBlock>
	);
};

AccordionFilterContainer.defaultProps = {
	title: ''
};

AccordionFilterContainer.propTypes = {
	tag: PropTypes.string.isRequired,
	title: PropTypes.string
};

export { AccordionFilterContainer as default, AccordionFilterContainer };
