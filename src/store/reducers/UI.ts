import { UIAction, UIActionType } from '../actions/Ui';
import { defaultThemeOptions } from '../../theme';

const initialState = {
    isLoading: false,
    themeOptions: defaultThemeOptions, 
    error: null as Error,
    bannerOpen: false
};

export const ui = (state = initialState, action: UIAction) => {
    switch (action.type) {
        case UIActionType.UI_LOADING_START:
            return {
                ...state,
                isLoading: true
            };
        case UIActionType.UI_LOADING_END:
            return {
                ...state,
                isLoading: false
            };
        case UIActionType.UI_SET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case UIActionType.UI_SET_MESSAGE:
            return {
                ...state,
                snackbarMessage: action.message
            };
        case UIActionType.UI_OPEN_SNACKBAR:
            return {
                ...state,
                snackbarMessage: action.message,
                snackbarOpen: true
            };
        case UIActionType.UI_CLOSE_SNACKBAR:
            return {
                ...state,
                snackbarMessage: null,
                snackbarOpen: false
            };
        case UIActionType.UI_SHOW_BANNER:
            return {
                ...state,
                bannerOpen: true,
                bannerType: action.bannerType,
                bannerMessage: action.message
            };
        case UIActionType.UI_HIDE_BANNER:
            return {
                ...state,
                bannerOpen: false
            };
        case UIActionType.UI_SET_THEME:
            return {
                ...state,
                theme: action.themeOptions
            }
    }
    return state;
};