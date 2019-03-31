import { authService } from '../../services/AuthService';
import { Dispatch } from 'redux';
import { auth, User } from 'firebase';
import UserCredential = firebase.auth.UserCredential;

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

    USER_EMAIL_UNVERIFIED = 'USER_EMAIL_UNVERIFIED',
    USER_VERIFICATION_EMAIL_REQUEST = 'USER_VERIFICATION_EMAIL_REQUEST',
    USER_VERIFICATION_EMAIL_SUCCESS = 'USER_VERIFICATION_EMAIL_SUCCESS',
    USER_VERIFICATION_EMAIL_FAILURE = 'USER_VERIFICATION_EMAIL_FAILURE',

    USER_CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST',
    USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS',
    USER_CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE'
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


/* USER SIGN UP */
const signUpRequest = () => ({
    type: UserActionType.USER_SIGNUP_REQUEST,
});

const signUpSuccess = () => ({
    type: UserActionType.USER_SIGNUP_SUCCESS
});

const signUpFailure = (error: Error) => ({
    type: UserActionType.USER_SIGNUP_FAILURE,
    error
});

/** USER EMAIL VERIFICATION */
const userEmailUnverified = (user: firebase.User): UserAction => ({
    type: UserActionType.USER_EMAIL_UNVERIFIED,
    user
});

const userVerificationEmailRequest = (): UserAction => ({
    type: UserActionType.USER_VERIFICATION_EMAIL_REQUEST
});

const userVerificationEmailSuccess = (user: firebase.User): UserAction => ({
    type: UserActionType.USER_VERIFICATION_EMAIL_SUCCESS,
    user
});

const userVerificationEmailFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_VERIFICATION_EMAIL_FAILURE,
    error
});

const userChangePasswordRequest = () => ({
    type: UserActionType.USER_CHANGE_PASSWORD_REQUEST
});
const userChangePasswordSuccess = () => ({
    type: UserActionType.USER_CHANGE_PASSWORD_SUCCESS
});

const userChangePasswordFailure = (error: Error) => ({
    type: UserActionType.USER_CHANGE_PASSWORD_FAILURE,
    error
});

export const changePassword = (password: string) => async (dispatch: Dispatch) => {
    dispatch(userChangePasswordRequest());
    try {
        const user = authService.getAuth().currentUser;
        await user.updatePassword(password);
        dispatch(userChangePasswordSuccess());
    } catch (error) {
        dispatch(userChangePasswordFailure(error));
    }
};


export const requestEmailVerification = (user: firebase.User) => requestEmailVerificationThunk(user);

const requestEmailVerificationThunk = (user: firebase.User) => async (dispatch: Dispatch) => {
    try {
        dispatch(userVerificationEmailRequest());
        await user.sendEmailVerification();
        dispatch(userVerificationEmailSuccess(user));
    } catch (error) {
        dispatch(userVerificationEmailFailure(error));
    }
};

export const signUp = (email: string, password: string, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(signUpRequest());
            const { user } = await authService.createUserWithEmailAndPassword(email, password);
            callback();
            await requestEmailVerificationThunk(user)(dispatch);
            dispatch(signUpSuccess());
        } catch (error) {
            dispatch(signUpFailure(error));
        }
    }
};

export const login = (email: string, password: string, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(loginRequest());
            const { user } = await authService.login(email, password);
            if (user.emailVerified) {
                dispatch(loginSuccess(user));
                callback();
            } else {
                dispatch(userEmailUnverified(user));
            }
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
};


export const logout = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(logOutRequest());
            await authService.logOut();
            dispatch(logOutSuccess());
        } catch (error) {
            dispatch(logOutFailure(error));
        }
    };
};