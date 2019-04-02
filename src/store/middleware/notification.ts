import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { UserAction, UserActionType } from "../actions/User";
import { uiShowBanner } from "../actions/Ui";
import { BannerType } from "../../config/constants";

export const notificationMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    const actionType = new String(action.type).toString();
    let message;

    switch (actionType) {
        case UserActionType.USER_VERIFICATION_EMAIL_SUCCESS:
            message = `Verification email successfully sent to ${(action as UserAction).user.email}. Please verify before logging in.`;
            store.dispatch(uiShowBanner(actionType, BannerType.INFO, message));
            break;
        case UserActionType.USER_EMAIL_UNVERIFIED:
            message = `Email has not been verified. Please check your ${(action as UserAction).user.email} inbox to verify`;
            store.dispatch(uiShowBanner(actionType, BannerType.ERROR, message));
            break;
        case UserActionType.USER_SIGNUP_FAILURE:
            store.dispatch(uiShowBanner(actionType, BannerType.ERROR, (action as UserAction).error.message));
            break;
        case UserActionType.USER_LOGIN_FAILURE:
            store.dispatch(uiShowBanner(actionType, BannerType.ERROR, (action as UserAction).error.message));
            break;
        case UserActionType.USER_CHANGE_PASSWORD_FAILURE:
            store.dispatch(uiShowBanner(actionType, BannerType.ERROR, (action as UserAction).error.message));
            break;
        case UserActionType.USER_CHANGE_PASSWORD_SUCCESS:
            store.dispatch(uiShowBanner(actionType, BannerType.INFO, 'Successfully updated password'));
            break;
        case UserActionType.USER_SAVE_THEME_PREFERENCES_SUCCESS:
            store.dispatch(uiShowBanner(actionType, BannerType.INFO, 'Theme preferences successfully updated'));
            break;
    }

    next(action);
};