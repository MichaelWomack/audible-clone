import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { UploadTaskActionType, UploadTaskAction } from '../actions/Audio';
import { uiOpenSnackbar, uiCloseSnackbar } from '../actions/Ui';

// const whitelist: any[] = [
//     UploadTaskActionType
// ];

export const snackbarMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => action => {

    const actionType = new String(action.type).toString();

    const toastSnackbar = (message: string, timeout: number) => {
        store.dispatch(uiOpenSnackbar(actionType, message));
        setTimeout(() => {
            store.dispatch(uiCloseSnackbar(actionType));
        }, timeout);
    }

    // if (whitelist.includes(actionType)) {
        switch(action.type) {
            case UploadTaskActionType.UPLOAD_AUDIO_SUCCESS:
                toastSnackbar(`Upload complete!`, 4000);
                break;
        }
    // }

    next(action);
};