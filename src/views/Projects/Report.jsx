import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AnonymousIcon from '@material-ui/icons/PersonOutline';

import { GridContainer, GridItem, ReportTable } from 'components';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 320,
		margin: 'auto'
	},
	anchorStyle: {
		textDecoration: 'none',
		color: theme.palette.primary.main
	},
	button: {
		border: '1px solid rgba(0,0,0, 0.4)',
		marginBottom: 20
	},
	subheaderRoot: {
		lineHeight: 'inherit',
		marginBottom: 20
	}
}));

const LinkTo = ({ to, children }) => {
	const c = useStyles();
	return (
		<Link className={c.anchorStyle} to={to}>
			{children}
		</Link>
	);
};

const ListLinkItem = ({ title, children, onClick }) => {
	const c = useStyles();
	return (
		<ListItem classes={{ button: c.button }} button onClick={onClick}>
			<ListItemIcon>{children}</ListItemIcon>
			<ListItemText primary={title} />
		</ListItem>
	);
};

const ProjectReport = ({ location }) => {
	const c = useStyles();
	const params = new URLSearchParams(location.search);
	const projectRef = params.get('ref');
	const profileType = params.get('type');
	console.log(projectRef, profileType);
	return (
		<GridContainer alignItems='center'>
			<GridItem md={12}>
				{profileType ? (
					<ReportTable type={profileType} />
				) : (
					<div className={c.root}>
						<List
							component='nav'
							aria-label='Generate-profile'
							subheader={
								<ListSubheader
									disableGutters
									color='primary'
									component='div'
									id='Generate-profile-header'
									classes={{ root: c.subheaderRoot }}
								>
									GENERATE TESTER PROFILE REPORT FOR PROJECT{' '}
									<b>AREA-51</b>
								</ListSubheader>
							}
						>
							<LinkTo
								to={{
									pathname: '/project/report',
									search: '?ref=xyz&type=named'
								}}
							>
								<ListLinkItem title={'Named profiles'}>
									<PersonIcon />
								</ListLinkItem>
							</LinkTo>

							<LinkTo
								to={{
									pathname: '/project/report',
									search: '?ref=wry&type=anonymous'
								}}
							>
								<ListLinkItem title={'Anonymous profiles'}>
									<AnonymousIcon />
								</ListLinkItem>
							</LinkTo>
						</List>
					</div>
				)}
			</GridItem>
		</GridContainer>
	);
};

export { ProjectReport as default, ProjectReport };
