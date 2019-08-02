export const root = ({ palette, spacing }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 'inherit',
    right: spacing.unit * 4,
    zIndex: 2,
    color: palette.grey[700],
    cursor: 'pointer',
    '&:hover': {
        color: palette.error.main,
    },
});

export default theme => ({
    root: root(theme),
    icon: {
        height: 'inherit',
        width: '90%',
        color: 'inherit',
    },
});
