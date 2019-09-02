import React, { Fragment, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

// Local
import { AddNewUser } from 'views/Modals';
import {
	GridContainer,
	GridItem,
	NavigateButton,
	Table,
	BarLoader,
	withModal,
	PaginationBase
} from 'components';

// Selectors
import { selectUserList } from 'selectors';

// Actions
import { listUsers } from 'actions';

const useStyles = makeStyles(({ spacing }) => ({
	buttonGridStyle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'flex-end'
	},
	projectButton: {
		marginRight: spacing()
	},
	footer: {
		marginTop: spacing(3),
		display: 'flex',
		justifyContent: 'center'
	}
}));

const AllUsers = ({
	users,
	handleAddNewUser,
	handleClientEditModal,
	listUsers
}) => {
	const c = useStyles();
	const [isLoading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	const pageStep = 10;
	const totalPages =
		Math.floor(users.length / pageStep) + !!(users.length % pageStep) || 1;

	useEffect(() => {
		let shouldCancel = false;
		listUsers().then(() => !shouldCancel && setLoading(false));

		return () => (shouldCancel = true);
	}, []);

	return (
		<GridContainer alignItems='center'>
			<GridItem md={12} className={c.buttonGridStyle}>
				<NavigateButton
					onClick={() => handleAddNewUser()}
					variant='outlined'
					color='secondary'
				>
					Add new user
				</NavigateButton>
			</GridItem>
			<GridItem md={12}>
				{isLoading ? (
					<BarLoader />
				) : (
					<Fragment>
						<Table
							action
							data={users}
							page={page}
							noResultsText='No users'
						/>
						{!!users.length && (
							<div className={c.footer}>
								<PaginationBase
									handlePage={page => setPage(page)}
									totalPages={totalPages}
								/>
							</div>
						)}
					</Fragment>
				)}
			</GridItem>
		</GridContainer>
	);
};

const mapState = state => ({
	users: selectUserList(state)
});

const mapDispatch = { listUsers };

const mapModal = {
	handleAddNewUser: AddNewUser
};

const _AllUsers = compose(
	connect(
		mapState,
		mapDispatch
	),
	withModal(mapModal)
)(AllUsers);

export { _AllUsers as default, _AllUsers as AllUsers };
