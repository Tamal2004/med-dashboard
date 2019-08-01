import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class CircularLoader extends Component {
	render() {
		return (
			<CircularProgress
				size='25px'
				style={{
					color: 'rgb(244, 244, 244)',
					position: 'absolute',
					top: '10%',
				}}
			/>
		);
	}
}

export { CircularLoader as default, CircularLoader };
