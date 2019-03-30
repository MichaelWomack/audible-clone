import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { uiLoadingStart, uiLoadingEnd, uiSetError } from '../actions/Ui';
import { AudioCrudActionType, UploadTaskActionType } from '../actions/Audio';
import { UserActionType } from "../actions/User";

const actionBlacklist: any[] = [
    AudioCrudActionType.CREATE_AUDIO_DOCUMENT_REQUEST,
    AudioCrudActionType.CREATE_AUDIO_DOCUMENT_FAILURE,
    AudioCrudActionType.CREATE_AUDIO_DOCUMENT_SUCCESS,
    AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_REQUEST,
    AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_SUCCESS,
    AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_FAILURE,
                                                         /* don't show loading everytime something is updated */
    ...Object.keys(UploadTaskActionType), /* uploading handled separately */
];

export const loaderMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => action => {
    const actionType = new String(action.type).toString();

    if (!actionBlacklist.includes(actionType)) {
        if (actionType.endsWith('REQUEST')) {
            store.dispatch(uiLoadingStart(actionType));
        } else if (actionType.endsWith('SUCCESS')) {
            store.dispatch(uiLoadingEnd(actionType))
        } else if (actionType.endsWith('FAILURE')) {
            store.dispatch(uiSetError(actionType))
        } else if (action.type === UserActionType.USER_EMAIL_UNVERIFIED) {
            store.dispatch(uiLoadingEnd(actionType));
        }
    }
    return next(action);
};

