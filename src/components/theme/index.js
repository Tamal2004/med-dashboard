// Material
import { createMuiTheme } from '@material-ui/core/styles';

// Local
import palette from './palette';
import overrides from './overrides';
import typography from './typography';

// TODO: Revise 'LEGACY'
export default createMuiTheme({
    palette,
    overrides,
    typography
});