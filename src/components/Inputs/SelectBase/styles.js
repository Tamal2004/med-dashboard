import { root as cancellableRoot } from './Select/SelectCancellableIcon/styles';

export default ({ spacing, palette, shape }) => ({
    container: {
        width: '100%',
        height: '100%',
        border: '1px solid',
        borderColor: palette.common.transparent,
        borderRadius: shape.borderRadius,
        // InputBase
        '& > div': {
            marginTop: 0,
            height: 'inherit'
        },
        '&:hover': {
            borderColor: palette.grey[500]
        }
    },
    cancellableRoot: {
        ...cancellableRoot({ spacing, palette }),
        display: 'none'
    }
});
