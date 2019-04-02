import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { ThemeType } from "./config/constants";

const requiredOptions = {
    typography: {
        useNextVariants: true,
    },
};

export const defaultThemeOptions: ThemeOptions = {
   ...requiredOptions,
    palette: {
       type: ThemeType.LIGHT
    }
};

