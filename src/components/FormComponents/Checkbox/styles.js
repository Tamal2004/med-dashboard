export default ({ spacing, typography }) => ({
    root: {
        width: '100%',
        paddingRight: 0,
        marginTop: spacing.unitPadding * 3,
        marginBottom: spacing.unitPadding,
        marginLeft: 0,
        marginRight: 0
    },
    label: {
        maxHeight: spacing.unitHeight,
        //marginLeft: spacing.unit,
        fontSize: typography.body1.fontSize,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
})