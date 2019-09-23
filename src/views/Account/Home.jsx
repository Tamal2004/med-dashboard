import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import UserIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';

import { GridContainer, GridItem, NavigateButton, withModal } from 'components';

import { updateAuthUserPassword } from 'actions';
import { UpdateProfile } from 'views/Modals';

import DeleteAccount from './DeleteAccount';

const useStyles = makeStyles(theme => ({
	alignCenter: {
		textAlign: 'center'
	},
	settingList: {
		minHeight: 300
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	editIcon: {
		cursor: 'pointer'
	}
}));

const ProfileHome = props => {
	const c = useStyles();
	const initialState = {
		oldPassword: '',
		newPassword: '',
		showPassword: false,
		showPasswordField: false
	};

	const {
		auth: { email, name, isTester },
		updateAuthUserPassword,
		handleUpdateProfile
	} = props;

	const [values, setValues] = useState(initialState);

	const resetState = () => setValues(initialState);

	const handleChange = prop => event =>
		setValues({ ...values, [prop]: event.target.value });

	const handleClickShowPassword = () =>
		setValues({ ...values, showPassword: !values.showPassword });

	const showPasswordChangeField = () =>
		setValues({ ...values, showPasswordField: !values.showPasswordField });

	const handleMouseDownPassword = event => event.preventDefault();

	const submitPassword = () =>
		updateAuthUserPassword({
			oldPassword: values.oldPassword,
			newPassword: values.newPassword
		}).then(() => resetState());

	const isValid = () =>
		values.oldPassword.length >= 6 && values.newPassword.length >= 6;

	const PasswordAdornment = () => (
		<InputAdornment position='end'>
			<IconButton
				aria-label='toggle password visibility'
				onClick={handleClickShowPassword}
				onMouseDown={handleMouseDownPassword}
			>
				{values.showPassword ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
	);

	return (
		<GridContainer alignItems='center'>
			<GridItem md={12} sm={12} className={c.alignCenter}>
				<Typography variant='h6'>ACCOUNT DETAILS</Typography>
			</GridItem>
			<GridItem md={6} sm={12} className={c.settingList}>
				<List subheader={<ListSubheader>Information</ListSubheader>}>
					<ListItem>
						<ListItemIcon>
							<UserIcon />
						</ListItemIcon>
						<ListItemText id='user-name' primary={name} />
						<ListItemIcon
							className={c.editIcon}
							onClick={() => handleUpdateProfile()}
						>
							<EditIcon />
						</ListItemIcon>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<EmailIcon />
						</ListItemIcon>
						<ListItemText id='user-email' primary={email} />
					</ListItem>
				</List>
			</GridItem>
			<GridItem md={6} sm={12} className={c.settingList}>
				<List subheader={<ListSubheader>Settings</ListSubheader>}>
					<ListItem>
						<NavigateButton
							color='secondary'
							variant='outlined'
							onClick={showPasswordChangeField}
						>
							{values.showPasswordField
								? 'Cancel'
								: 'Change Password'}
						</NavigateButton>
					</ListItem>
					{isTester && !values.showPasswordField && (
						<ListItem>
							<DeleteAccount />
						</ListItem>
					)}

					{values.showPasswordField && (
						<Fragment>
							<ListItem>
								<FormControl>
									<InputLabel htmlFor='old-password'>
										Old password
									</InputLabel>
									<Input
										id='old-password'
										fullWidth
										type='password'
										value={values.oldPassword}
										onChange={handleChange('oldPassword')}
									/>
								</FormControl>
							</ListItem>
							<ListItem>
								<FormControl>
									<InputLabel htmlFor='new-password'>
										New password
									</InputLabel>
									<Input
										id='new-password'
										fullWidth
										type={
											values.showPassword
												? 'text'
												: 'password'
										}
										value={values.newPassword}
										onChange={handleChange('newPassword')}
										endAdornment={<PasswordAdornment />}
									/>
								</FormControl>
							</ListItem>
							<ListItem>
								<NavigateButton
									disabled={!isValid()}
									onClick={async () => await submitPassword()}
									enableLoader
								>
									Update Password
								</NavigateButton>
							</ListItem>
						</Fragment>
					)}
				</List>
			</GridItem>
		</GridContainer>
	);
};

const mapModal = {
	handleUpdateProfile: UpdateProfile
};

const mapState = ({ auth }) => ({ auth });
const mapDispatch = {
	updateAuthUserPassword
};

const _ProfileHome = compose(
	connect(
		mapState,
		mapDispatch
	),
	withModal(mapModal)
)(ProfileHome);

export { _ProfileHome as default, _ProfileHome as ProfileHome };
