import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { UploadTaskActionType, AudioCrudActionType, AudioCrudAction, UploadTaskAction } from '../actions/Audio';
import { pauseAudio, PlayerActionType } from '../actions/AudioPlayer';
import { uiOpenSnackbar, uiCloseSnackbar } from '../actions/Ui';
import { ReduxState } from "../../model/state";

export const snackbarMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => action => {

    const actionType = new String(action.type).toString();

    const toastSnackbar = (message: string, timeout: number, callback?: Function) => {
        store.dispatch(uiOpenSnackbar(actionType, message));
        setTimeout(() => {
            store.dispatch(uiCloseSnackbar(actionType));
            if (callback) callback();
        }, timeout);
    };

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
        case PlayerActionType.SET_SLEEP_TIMER:
            toastSnackbar(`Sleep timer set for ${action.sleepTimer.duration} minutes`, 4000);
            break;
        case PlayerActionType.CLEAR_SLEEP_TIMER:
            const { player }: ReduxState = store.getState();
            const callback = () => player.isPlaying && store.dispatch(pauseAudio());
            toastSnackbar(`Time's up! Audio will stop playing`, 4000, callback);
            break;
    }

    next(action);
};