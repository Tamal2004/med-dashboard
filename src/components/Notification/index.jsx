import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	ErrorNotification,
	SuccessNotification,
	WarningNotification,
	InfoNotification
} from '../Snackbars';

import { resetNotification } from 'actions';

const Notification = ({ type, message }) => {
	let Notification;
	switch (type.toLowerCase()) {
		case 'success':
			Notification = <SuccessNotification message={message} />;
			break;

		case 'error':
			Notification = <ErrorNotification message={message} />;
			break;

		case 'warning':
			Notification = <WarningNotification message={message} />;
			break;

		case 'info':
			Notification = <InfoNotification message={message} />;
			break;

		default:
			Notification = <InfoNotification message={message} />;
			break;
	}
	return Notification;
};

Notification.defaultProps = {
	message: '',
	type: 'info'
};

Notification.propTypes = {
	message: PropTypes.string,
	type: PropTypes.oneOf(['error', 'info', 'success', 'warning'])
};

const ShowNotification = ({ type, message, resetNotification }) => {
	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				resetNotification();
			}, 4000);
			return () => clearTimeout(timer);
		}
	});

	if (!message) return null;
	return <Notification type={type} message={message} />;
};

const mapState = ({ notification }) => notification;
const mapDispatch = {
	resetNotification
};

const _ShowNotification = connect(
	mapState,
	mapDispatch
)(ShowNotification);

export { _ShowNotification as default, _ShowNotification as Notification };
