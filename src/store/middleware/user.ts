import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { setUserSettings, UserAction, UserActionType } from "../actions/User";
import { uiSetThemeOptions } from '../actions/Ui';

/** middleware to handle side effects of user event actions */
/** SET_USER dispatch handled by firebase.onAuthStateChange() implementation. No need handle here.
 * */
export const userMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: any) => {

    const userAction = action as UserAction;
    switch (action.type) {
        case UserActionType.USER_LOGIN_SUCCESS:
            store.dispatch(uiSetThemeOptions(userAction.settings.themeOptions));
            store.dispatch(setUserSettings(userAction.settings));
            break;
    }
    next(action);
};