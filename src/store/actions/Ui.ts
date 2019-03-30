import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { BannerType } from "../../config/constants";

export enum UIActionType {
    UI_LOADING_START = 'UI_LOADING_START',
    UI_LOADING_END = 'UI_LOADING_END',
    UI_SET_ERROR = 'UI_SET_ERROR',
    UI_SET_MESSAGE = 'UI_SET_MESSAGE',
    UI_OPEN_SNACKBAR = 'UI_OPEN_SNACKBAR',
    UI_CLOSE_SNACKBAR = 'UI_CLOSE_SNACKBAR',
    UI_SHOW_BANNER = 'UI_SHOW_BANNER',
    UI_HIDE_BANNER = 'UI_HIDE_BANNER',
    UI_SET_THEME = 'UI_SET_THEME'
}

export interface UIAction {
    type: UIActionType,
    triggerActionName: string,
    themeOptions: ThemeOptions,
    error: Error,
    message: string,
    bannerType: BannerType
}

export const uiLoadingStart = (triggeringActionName: string) => ({
    type: UIActionType.UI_LOADING_START,
    triggeringActionName
});

export const uiLoadingEnd = (triggeringActionName: string) => ({
    type: UIActionType.UI_LOADING_END,
    triggeringActionName
});

export const uiSetError = (triggeringActionName: string) => ({
    type: UIActionType.UI_SET_ERROR,
    triggeringActionName
});

export const uiOpenSnackbar = (triggeringActionName: string, message: string) => ({
    type: UIActionType.UI_OPEN_SNACKBAR,
    triggeringActionName,
    message
});

export const uiCloseSnackbar = (triggeringActionName: string) => ({
    type: UIActionType.UI_CLOSE_SNACKBAR,
    triggeringActionName
});

export const uiSetTheme = (themeOptions: ThemeOptions) => ({
    type: UIActionType.UI_SET_THEME,
    themeOptions
});

export const uiShowBanner = (triggeringActionName: string, bannerType: string, message: string) => ({
    type: UIActionType.UI_SHOW_BANNER,
    bannerType,
    message
});

export const uiHideBanner = (triggeringActionName: string) => ({
    type: UIActionType.UI_HIDE_BANNER,
    triggeringActionName
});
