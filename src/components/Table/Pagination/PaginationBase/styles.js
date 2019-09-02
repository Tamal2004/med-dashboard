export default ({ palette, shadows, spacing }) => ({
	root: {
		display: 'inline-flex',
		boxShadow: shadows[0],
		borderBottom: 'unset',
		borderTop: 'unset',
		borderColor: palette.grey[400]
	}
});
