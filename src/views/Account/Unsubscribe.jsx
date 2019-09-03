import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import qString from 'query-string';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { GridContainer, GridItem, NavigateButton } from 'components';

//Local
import { unsubscribe } from 'actions';
import history from 'libs/history';

const useStyles = makeStyles(theme => ({
	btnStyle: {
		background: '#292929',
		minWidth: 150,
		'&:hover': {
			background: '#424244'
		},
		[theme.breakpoints.down('sm')]: {
			minWidth: 100,
			marginBottom: 10
		}
	},
	gridWrapper: {
		minHeight: 300,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		border: '2px solid #d2d2d2',
		margin: 40
	},
	buttonWrapper: {
		display: 'flex',
		width: '80%',
		justifyContent: 'space-around',
		alignContent: 'space-between',
		marginTop: 30,
		borderTop: '2px solid #eaeaea',
		paddingTop: 30,
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column'
		}
	},
	typography: {
		fontWeight: 700
	}
}));

const Button = ({ children, onClick }) => {
	const c = useStyles();
	return (
		<NavigateButton className={c.btnStyle} onClick={onClick}>
			{children}
		</NavigateButton>
	);
};

const UnsubscribeUser = ({ unsubscribe, gotoSignIn }) => {
	const c = useStyles();
	const values = qString.parse(history.location.search);

	const unsubscribeNow = () => {
		return unsubscribe(values.id);
	};

	return (
		<GridContainer alignItems='center'>
			<GridItem md={6} xs={8} className={c.gridWrapper}>
				<Typography className={c.typography} variant='h5' gutterBottom>
					Do you really want to unsubscribe?
				</Typography>
				<div className={c.buttonWrapper}>
					<Button onClick={() => unsubscribeNow()}>Yes</Button>
					<Button
						onClick={() => {
							history.replace('/');
							gotoSignIn();
						}}
					>
						No
					</Button>
				</div>
			</GridItem>
		</GridContainer>
	);
};

const mapDispatch = {
	unsubscribe
};

const _UnsubscribeUser = compose(
	connect(
		null,
		mapDispatch
	)
)(UnsubscribeUser);

export { _UnsubscribeUser as default, _UnsubscribeUser as UnsubscribeUser };
