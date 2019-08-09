import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { validateRequired } from 'libs';
import {
	GridContainer,
	GridItem,
	Button,
	NavigateButton,
	Select,
	Input,
	MultiInput
} from 'components';

const useStyles = makeStyles(theme => ({
	gridContainer: {
		padding: 16
	}
}));

const GridWrapper = ({ children }) => {
	const c = useStyles();
	return (
		<GridContainer className={c.gridContainer} alignItems='flex-start'>
			{children}
		</GridContainer>
	);
};

const TesterMail = () => {
	const c = useStyles();
	return (
		<Fragment>
			<GridWrapper>
				<Typography align='center' variant='h6'>
					Mail Testers
				</Typography>
			</GridWrapper>
			<GridWrapper>
				<GridItem md={8}>
					<Select label='From' name='from' data={[]} required />
					<Select label='To' name='to' data={[]} required />
					<Input
						label='Subject'
						name='subject'
						placeholder='Subject'
						required
					/>
					<Select label='Project' name='project' data={[]} />
					<Select label='Contact type' name='contactType' data={[]} />
					<MultiInput name='body' placeholder='Write something....' />
				</GridItem>
			</GridWrapper>
			<GridWrapper align='right'>
				<Button variant='contained' color='primary' size='large'>
					Send Mail
				</Button>
			</GridWrapper>
		</Fragment>
	);
};

const validate = values => {
	const required = [];

	return { ...validateRequired(values, required) };
};

const mapState = state => ({});
const mapDispatch = {};

const _TesterMail = compose(
	connect(
		mapState,
		mapDispatch
	),
	reduxForm({ form: 'TesterMail', validate })
)(TesterMail);

export { _TesterMail as default, _TesterMail as TesterMail };
