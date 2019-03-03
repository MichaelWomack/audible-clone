import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { UploadTaskActionType, AudioCrudActionType, AudioCrudAction, UploadTaskAction } from '../actions/Audio';
import { uiOpenSnackbar, uiCloseSnackbar } from '../actions/Ui';

export const snackbarMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => action => {

    const actionType = new String(action.type).toString();

    const toastSnackbar = (message: string, timeout: number) => {
        store.dispatch(uiOpenSnackbar(actionType, message));
        setTimeout(() => {
            store.dispatch(uiCloseSnackbar(actionType));
        }, timeout);
    }

    switch(action.type) {
        case UploadTaskActionType.UPLOAD_AUDIO_SUCCESS:
            const uploadAction = action as UploadTaskAction;
            const uploadedFiles = action.audio.trackList.length;
            toastSnackbar(`Successfully uploaded ${uploadedFiles} files for ${uploadAction.audio.title}!`, 4000);
            break;
        case AudioCrudActionType.DELETE_AUDIO_DOCUMENT_SUCCESS:
            const deleteAction = action as AudioCrudAction;
            toastSnackbar(`Successfully deleted ${deleteAction.audio.title}!`, 4000);
            break;
    }

    next(action);
};