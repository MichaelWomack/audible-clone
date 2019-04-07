import { Dispatch } from 'redux';
import { auth, User } from 'firebase';
import { SerializableUser, UserSettings } from "../../model/user";
import { authService, userService } from '../../services';
import { ReduxState } from "../../model/state";

export enum UserActionType {
    SET_USER = 'SET_USER',

    SET_USER_SETTINGS = 'SET_USER_SETTING',

    USER_SAVE_THEME_PREFERENCES_REQUEST = 'USER_SAVE_THEME_PREFERENCES_REQUEST',
    USER_SAVE_THEME_PREFERENCES_SUCCESS = 'USER_SAVE_THEME_PREFERENCES_SUCCESS',
    USER_SAVE_THEME_PREFERENCES_ERROR = 'USER_SAVE_THEME_PREFERENCES_ERROR',

    USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',

    USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
    USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
    USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE',

    USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST',
    USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS',
    USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE',
    USER_SIGNUP_WITH_PROVIDER_SUCCESS = 'USER_SIGNUP_WITH_PROVIDER_SUCCESS',

    USER_EMAIL_UNVERIFIED = 'USER_EMAIL_UNVERIFIED',

    USER_VERIFICATION_EMAIL_REQUEST = 'USER_VERIFICATION_EMAIL_REQUEST',
    USER_VERIFICATION_EMAIL_SUCCESS = 'USER_VERIFICATION_EMAIL_SUCCESS',
    USER_VERIFICATION_EMAIL_FAILURE = 'USER_VERIFICATION_EMAIL_FAILURE',

    USER_CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST',
    USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS',
    USER_CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE',

    USER_CREATE_DOCUMENT_REQUEST = 'USER_CREATE_DOCUMENT_REQUEST',
    USER_CREATE_DOCUMENT_SUCCESS = 'USER_CREATE_DOCUMENT_SUCCESS',
    USER_CREATE_DOCUMENT_FAILURE = 'USER_CREATE_DOCUMENT_FAILURE',

    USER_UPDATE_DOCUMENT_REQUEST = 'USER_UPDATE_DOCUMENT_REQUEST',
    USER_UPDATE_DOCUMENT_SUCCESS = 'USER_UPDATE_DOCUMENT_SUCCESS',
    USER_UPDATE_DOCUMENT_FAILURE = 'USER_UPDATE_DOCUMENT_FAILURE',

    USER_READ_DOCUMENT_REQUEST = 'USER_READ_DOCUMENT_REQUEST',
    USER_READ_DOCUMENT_SUCCESS = 'USER_READ_DOCUMENT_SUCCESS',
    USER_READ_DOCUMENT_FAILURE = 'USER_READ_DOCUMENT_FAILURE',
}

export interface UserAction {
    type: UserActionType;
    user?: firebase.User;
    settings?: UserSettings;
    userDocument?: SerializableUser;
    authProvider?: auth.EmailAuthProvider;
    error?: Error;
}

/* LOGIN */
const loginRequest = () => ({
    type: UserActionType.USER_LOGIN_REQUEST,
});

const loginSuccess = (user: firebase.User, settings: UserSettings): UserAction => ({
    type: UserActionType.USER_LOGIN_SUCCESS,
    user,
    settings
});

const loginFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_LOGIN_FAILURE,
    error,
});

export const login = (email: string, password: string, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(loginRequest());
            const { user } = await authService.login(email, password);
            if (user.emailVerified) {
                const userDocument = await userService.getUser(user.email);
                if (!userDocument) throw new Error(`Please sign up with ${user.email} before to login.`);
                dispatch(loginSuccess(user, userDocument.settings));
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
            const userDocument = await userService.getUser(user.email);
            if (!userDocument) throw new Error(`Please sign up with ${user.email} before login.`);
            callback();
            dispatch(loginSuccess(user, userDocument.settings));
        } catch (error) {
            console.error(error);
            dispatch(loginFailure(error));
        }
    }
};

/** LOGOUT */
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

export const setUser = (user: firebase.User): UserAction => ({
    type: UserActionType.SET_USER,
    user,
});

const saveUserThemePreferencesRequest = () => ({
    type: UserActionType.USER_SAVE_THEME_PREFERENCES_REQUEST
});

const saveUserThemePreferencesSuccess = () => ({
    type: UserActionType.USER_SAVE_THEME_PREFERENCES_SUCCESS
});

const saveUserThemePreferencesError = (error: Error) => ({
    type: UserActionType.USER_SAVE_THEME_PREFERENCES_ERROR,
    error
});


export const applyUserThemePreferences = () => async (dispatch: Dispatch, getState: Function) => {
    try {
        dispatch(saveUserThemePreferencesRequest());
        const state: ReduxState = getState();
        const { user, settings } = state.user;
        const serializableUser = await userService.getSerializableUser(user);
        serializableUser.settings = settings;
        await updateUserDocument(serializableUser, true)(dispatch);
        dispatch(saveUserThemePreferencesSuccess());
    } catch (error) {
        dispatch(saveUserThemePreferencesError(error));
    }
};

export const setUserSettings = (settings: UserSettings): UserAction => ({
    type: UserActionType.SET_USER_SETTINGS,
    settings
});

/* USER SIGN UP */
const signUpRequest = (): UserAction => ({
    type: UserActionType.USER_SIGNUP_REQUEST,
});

const signUpSuccess = (): UserAction => ({
    type: UserActionType.USER_SIGNUP_SUCCESS,
});

const signUpWithAuthProviderSuccess = (user: firebase.User): UserAction => ({
    type: UserActionType.USER_SIGNUP_REQUEST,
    user
});

const signUpFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_SIGNUP_FAILURE,
    error
});

export const signUp = (email: string, password: string, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(signUpRequest());
            const { user } = await authService.createUserWithEmailAndPassword(email, password);
            await createUserDocument(user, true)(dispatch);
            callback();
            await requestEmailVerification(user)(dispatch);
            dispatch(signUpWithAuthProviderSuccess(user));
        } catch (error) {
            dispatch(signUpFailure(error));
        }
    }
};

export const signUpWithAuthProvider = (authProvider: firebase.auth.AuthProvider, callback: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(signUpRequest());
            const { user } = await authService.loginWithProvider(authProvider);
            await createUserDocument(user, true)(dispatch);
            callback();
            dispatch(signUpSuccess());
            // dispatch(signUpWithAuthProviderSuccess(user));
        } catch (error) {
            dispatch(signUpFailure(error));
        }
    };
};

/** CHANGE USER PASSWORD */
const userChangePasswordRequest = (): UserAction => ({
    type: UserActionType.USER_CHANGE_PASSWORD_REQUEST
});

const userChangePasswordSuccess = (): UserAction => ({
    type: UserActionType.USER_CHANGE_PASSWORD_SUCCESS
});

const userChangePasswordFailure = (error: Error): UserAction => ({
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

/** CREATE USER DOCUMENT */
const createUserDocumentRequest = (): UserAction => ({
    type: UserActionType.USER_CREATE_DOCUMENT_REQUEST
});

const createUserDocumentSuccess = (): UserAction => ({
    type: UserActionType.USER_CREATE_DOCUMENT_SUCCESS,
});

const createUserDocumentFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_CREATE_DOCUMENT_FAILURE,
    error
});

export const createUserDocument = (user: firebase.User, throwErr = false) => async (dispatch: Dispatch) => {
    try {
        dispatch(createUserDocumentRequest());
        const serializableUser = userService.getSerializableUser(user);
        await userService.addUser(serializableUser);
        dispatch(createUserDocumentSuccess());
    } catch (error) {
        dispatch(createUserDocumentFailure(error));
        if (throwErr) throw error;
    }
};

/** UPDATE USER DOCUMENT */
const updateUserDocumentRequest = (): UserAction => ({
    type: UserActionType.USER_UPDATE_DOCUMENT_REQUEST
});

const updateUserDocumentSuccess = (): UserAction => ({
    type: UserActionType.USER_UPDATE_DOCUMENT_SUCCESS
});

const updateUserDocumentFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_UPDATE_DOCUMENT_FAILURE,
    error
});

export const updateUserDocument = (user: SerializableUser, throwErr = false) => async (dispatch: Dispatch) => {
    try {
        dispatch(updateUserDocumentRequest());
        await userService.updateUser(user);
        dispatch(updateUserDocumentSuccess());
    } catch (error) {
        console.log(error);
        dispatch(updateUserDocumentFailure(error));
        if (throwErr) throw error;
    }
};

/** READ USER DOCUMENT */
const readUserDocumentRequest = (): UserAction => ({
    type: UserActionType.USER_READ_DOCUMENT_REQUEST
});

const readUserDocumentSuccess = (userDocument: SerializableUser): UserAction => ({
    type: UserActionType.USER_READ_DOCUMENT_SUCCESS,
    userDocument
});

const readUserDocumentFailure = (error: Error): UserAction => ({
    type: UserActionType.USER_READ_DOCUMENT_FAILURE,
    error
});


export const getUserDocument = (email: string, throwErr = false) => async (dispatch: Dispatch) => {
    try {
        dispatch(readUserDocumentRequest());
        const user = await userService.getUser(email);
        dispatch(readUserDocumentSuccess(user));
    } catch (error) {
        dispatch(readUserDocumentFailure(error));
        if (throwErr) throw error;
    }
};


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

const requestEmailVerification = (user: firebase.User, throwErr = false) => async (dispatch: Dispatch) => {
    try {
        dispatch(userVerificationEmailRequest());
        await user.sendEmailVerification();
        dispatch(userVerificationEmailSuccess(user));
    } catch (error) {
        dispatch(userVerificationEmailFailure(error));
        if (throwErr) throw error;
    }
};