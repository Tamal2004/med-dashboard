export default ({ spacing, palette, shape }) => ({
	root: {
		border: 'none',
		boxShadow: 'none',
		margin: 0,
		'&:not(:first-child)': {
			margin: 0
		},
		'&:not(:last-child)': {
			borderBottom: 0
		},
		'&:before': {
			display: 'none'
		}
	},
	expanded: {
		margin: '0px !important',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12) !important'
	},
	border: {
		border: '1px solid',
		borderColor: palette.grey[200]
	}
});
