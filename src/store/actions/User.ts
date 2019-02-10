import { authService } from '../../services/AuthService';
import { Dispatch } from 'redux';
import { auth } from 'firebase';

export enum UserActionType {
    SET_USER = 'SET_USER',
    USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',

    USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
    USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
    USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE',

    USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST',
    USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS',
    USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE',
}

export interface UserAction {
    type: UserActionType;
    user?: firebase.User;
    authProvider?: auth.EmailAuthProvider;
    error?: Error;
}

/* ACTION CREATORS */
const loginRequest = () => ({
    type: UserActionType.USER_LOGIN_REQUEST,
});

const loginSuccess = (user: firebase.User): UserAction => ({
    type: UserActionType.USER_LOGIN_SUCCESS,
    user,
});

const loginFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_LOGIN_FAILURE,
    error,
});

const logOutRequest = (): UserAction => ({
    type: UserActionType.USER_LOGOUT_REQUEST,
});

const logOutSuccess = (): UserAction => ({
    type: UserActionType.USER_LOGOUT_SUCCESS,
});

const logOutFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_LOGOUT_FAILURE,
    error,
});

export const setUser = (user: firebase.User): UserAction => ({
    type: UserActionType.SET_USER,
    user,
});


/** ASYNC ACTIONS */
export const login = (email: string, password: string, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(loginRequest());
            const userCred: firebase.auth.UserCredential = await authService.login(email, password);
            const { user } = userCred;
            dispatch(loginSuccess(user));
            callback();
        } catch (error) {
            dispatch(loginFailure(error));
        }
    }
};

export const loginWithAuthProvider = (authProvider: auth.AuthProvider, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(loginRequest());
            const userCred: firebase.auth.UserCredential = await authService.loginWithProvider(authProvider);
            const { user } = userCred;
            dispatch(loginSuccess(user));
            callback();
        } catch (error) {
            dispatch(loginFailure(error));
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(logOutRequest());
            await authService.logOut();
            dispatch(logOutSuccess());
            //clear all state after logout
        } catch (error) {
            dispatch(logOutFailure(error));
        }
    };
}