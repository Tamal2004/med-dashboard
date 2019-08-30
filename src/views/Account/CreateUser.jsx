import React from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//Local
import { GridContainer, GridItem } from 'components';
import { validateRequired } from 'libs';
import { Button, Input } from 'components';
import { createUserByAdmin } from 'actions';
import { validateEmail } from 'libs';

const useStyles = makeStyles(theme => ({
	alignCenter: {
		textAlign: 'center'
	},
	buttonPosition: {
		margin: '0 auto'
	}
}));

const CreateUser = ({ handleSubmit, invalid }) => {
	const c = useStyles();

	return (
		<GridContainer alignItems='center'>
			<GridItem md={12} className={c.alignCenter}>
				<Typography variant='h6'>CREATE A NEW USER</Typography>
			</GridItem>
			<GridItem md={12}>
				<Input required label='First name' name='family_name' />
				<Input required label='Last name' name='given_name' />
				<Input
					required
					label='Email'
					validate={validateEmail}
					name='email'
				/>
			</GridItem>
			<GridItem md={12}>
				<Button
					className={c.buttonPosition}
					variant='contained'
					color='primary'
					size='large'
					onClick={handleSubmit}
					disabled={invalid}
				>
					CREATE USER
				</Button>
			</GridItem>
		</GridContainer>
	);
};

const _CreateUser = compose(
	reduxForm({
		form: 'CreateUser',
		validate: values => ({
			...validateRequired(values, ['family_name', 'given_name', 'email'])
		}),
		onSubmit: (values, dispatch) => dispatch(createUserByAdmin(values))
	})
)(CreateUser);

export { _CreateUser as default, _CreateUser as CreateUser };
