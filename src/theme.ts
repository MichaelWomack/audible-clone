import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import createPalette, { PaletteOptions } from '@material-ui/core/styles/createPalette';

const requiredOptions = {
    typography: {
        useNextVariants: true,
    },
};

export const defaultThemeOptions: ThemeOptions = {
   ...requiredOptions,
};

