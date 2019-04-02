import { UserAction, UserActionType } from '../actions/User';
import { UserState } from '../../model/state';
import { UserSettings } from "../../model/user";
import { defaultThemeOptions } from "../../theme";

/** try to only keep 'document' actions here. Example: SET_USER, SET_USER_SETTINGS...
 *  Event actions like **_REQUEST, **_SUCCESS, **_FAILURE can be handled in the user middleware for side effects
 */

const defaultState: UserState = {
    user: null,
    settings: { themeOptions: defaultThemeOptions } as UserSettings
};

export const user = (state = defaultState, action: UserAction) => {
    switch (action.type) {
        case UserActionType.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case UserActionType.SET_USER_SETTINGS:
            return {
                ...state,
                settings: action.settings
            };
        default:
            return state;
    }
};

