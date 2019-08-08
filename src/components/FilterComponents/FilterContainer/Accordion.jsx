import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, SearchAccordionPanel } from '../../Accordion';

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

const AccordionFilterContainer = ({ title, children }) => {
	const getRandomId = () => Math.floor(Math.random() * 99 + 1); //between 1 to 99
	const tag = title.split(' ').join('-') + '-' + getRandomId();

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
