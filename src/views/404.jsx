import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { GridContainer, GridItem, Link, NavigateButton } from 'components';

const useStyles = makeStyles(theme => ({
	alignContent: {
		padding: '2em 0em',
		textAlign: 'center'
	},
	buttonPosition: {
		margin: '0 auto'
	}
}));

const NotFoundPage = () => {
	const c = useStyles();
	return (
		<GridContainer className={c.alignContent}>
			<Typography variant='h1'>404</Typography>
			<GridItem md={12}>
				<Typography variant='h6'>
					OOPS, SORRY WE CAN'T FIND THAT PAGE!
				</Typography>
			</GridItem>
			<GridItem md={12}>
				<Typography variant='subtitle2'>
					Either something went wrong or the page doesn't exist
					anymore.
				</Typography>
			</GridItem>
			<GridItem md={12}>
				<Link to='/'>
					<NavigateButton
						className={c.buttonPosition}
						color='primary'
						size='large'
					>
						HOME PAGE
					</NavigateButton>
				</Link>
			</GridItem>
		</GridContainer>
	);
};

export { NotFoundPage as default, NotFoundPage };
