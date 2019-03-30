import { UserAction, UserActionType } from '../actions/User';
import { UserState } from '../../model/state';

const defaultState: UserState = {
    user: null,
};

export const user = (state = defaultState, action: UserAction) => {
    switch (action.type) {
        case UserActionType.USER_LOGIN_REQUEST:
            return state;
            
        case UserActionType.USER_LOGIN_SUCCESS:
            return { user: action.user };
            
        case UserActionType.USER_LOGOUT_REQUEST:
            return state;
            
        case UserActionType.USER_LOGOUT_SUCCESS:
            return { user: null };

        case UserActionType.USER_LOGOUT_FAILURE:
            return { error: action.error };

        case UserActionType.USER_EMAIL_UNVERIFIED:
            return {
                unverifiedUser: action.user
            };
        default:
            return state;
    }
}

