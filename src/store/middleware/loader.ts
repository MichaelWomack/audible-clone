import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { uiLoadingStart, uiLoadingEnd, uiSetError } from '../actions/Ui';
import { AudioCrudActionType, UploadTaskActionType } from '../actions/Audio';

const actionBlacklist: any[] = [
    ...Object.keys(AudioCrudActionType), /* don't show loading everytime something is updated */
    ...Object.keys(UploadTaskActionType), /* uploading handled separately */
];

console.log('loading blacklist: ', actionBlacklist);
export const loaderMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => action => {
    const actionType = new String(action.type);

    console.log(actionType);
    if (!actionBlacklist.includes(action)) {
        if (actionType.endsWith('REQUEST')) {
            store.dispatch(uiLoadingStart(actionType as string));
        } else if (actionType.endsWith('SUCCESS')) {
            store.dispatch(uiLoadingEnd(actionType as string))
        } else if (actionType.endsWith('FAILURE')) {
            store.dispatch(uiSetError(actionType as string))
        }
    }
    return next(action);
}

