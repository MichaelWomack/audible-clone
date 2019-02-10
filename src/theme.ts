import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const requiredOptions = {
    typography: {
        useNextVariants: true,
    },
};

export const defaultThemeOptions: ThemeOptions = {
   ...requiredOptions,
   
};

