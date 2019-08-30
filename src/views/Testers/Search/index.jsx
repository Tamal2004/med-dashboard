import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SearchFilter } from './SearchFilter';

import {
	GridContainer,
	GridItem,
	Link,
	NavigateButton,
	Table,
	SearchInput,
	withModal
} from 'components';
import { TesterMailModal } from 'views/Modals';
import { selectCounties } from 'selectors';

const useStyles = makeStyles(theme => ({
	gridDistance: {
		marginBottom: 32
	},
	searchMessage: {
		paddingTop: 5,
		textAlign: 'center'
	},
	filterGridWrapper: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	filterButtonWrapper: {
		float: 'right',
		marginBottom: 20
	}
}));

const GridWrapper = ({ className, children }) => {
	const c = useStyles();
	return (
		<GridContainer
			className={classNames(c.gridDistance, className)}
			alignItems='center'
		>
			{children}
		</GridContainer>
	);
};

const TesterSearch = ({ testers, handleMailModal }) => {
	const c = useStyles();
	return (
		<Fragment>
			<GridWrapper>
				<GridItem md={3}/>
				<GridItem md={6}>
					<SearchInput placeholder='Search by name or project reference' />
				</GridItem>
				<GridItem md={3}>
					<div className={c.filterButtonWrapper}>
						<NavigateButton onClick={() => handleMailModal()}>
							Email Testers
						</NavigateButton>
					</div>
				</GridItem>
			</GridWrapper>

			<GridWrapper className={c.filterGridWrapper}>
				<GridItem md={3}>
					<SearchFilter />
				</GridItem>
				<GridItem md={9}>
					<Table data={testers} page={1} handleEditModal={(idx) => console.log('modal', idx)} />
				</GridItem>
			</GridWrapper>
		</Fragment>
	);
};

const generateProjects = (
	tester,
	Age,
	Sex,
	email,
	Details = 'Great',
	notes = 'Lots of notes'
) => ({
	'Tester Name': {
		Component: <Link to={`/tester/${tester}`}>{tester}</Link>,
		value: tester
	},
	Age,
	Sex,
	'Email Address': email,
	Details,
	'Client Notes': notes,
	actions: {
		checkAction: (id) => console.log('checked', id)
	}
});

const mapState = state => ({
	testers: Array.range(0, 3)
		.map((v, index) => [
			generateProjects('John Test', 44, 'Male', 'john@test.com'),
			generateProjects('Jill Test', 24, 'Female', 'jill@test.com'),
			generateProjects('Jake Test', 46, 'Non-binary', 'jake@test.com')
		])
		.flatMap(x => x)
});

const mapModal = {
	handleMailModal: TesterMailModal
};

const _TesterSearch = compose(
	connect(
		mapState,
		null
	),
	withModal(mapModal)
)(TesterSearch);

export { _TesterSearch as default, _TesterSearch as TesterSearch };
