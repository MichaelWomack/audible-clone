import { Audio, AudioMap, AudioLibraryFilter } from '../../model/audio';
import { audioService, storageHelper, authService } from '../../services';
import { firestore, storage } from 'firebase';
import { Dispatch } from 'redux';

/*********** FETCH AUDIO ACTIONS ***********/
export enum FetchAudioActionType {
    FETCH_USER_AUDIO_REQUEST = 'FETCH_USER_AUDIO_REQUEST',
    FETCH_USER_AUDIO_SUCCESS = 'FETCH_USER_AUDIO_SUCCESS',
    FETCH_USER_AUDIO_FAILURE = 'FETCH_USER_AUDIO_FAILURE',
}

export interface FetchAudioAction {
    type: FetchAudioActionType;
    userId?: string;
    library?: Audio[];
    error?: Error;
}

const fetchUserAudioRequest = (userId: string) => ({
    type: FetchAudioActionType.FETCH_USER_AUDIO_REQUEST,
    userId,
});

const receiveUserAudioSuccess = (library: Audio[]) => ({
    type: FetchAudioActionType.FETCH_USER_AUDIO_SUCCESS,
    library,
});

const receiveUserAudioFailure = (error: Error) => ({
    type: FetchAudioActionType.FETCH_USER_AUDIO_FAILURE,
    error,
});

export const fetchUserAudio = (userId: string) => {
    return async (dispatch: Function) => {
        dispatch(fetchUserAudioRequest(userId));
        try {
            const value = await audioService.getAll(userId);
            const userAudioList: Audio[] = [];
            value.forEach(record => userAudioList.push(record.data()));
            dispatch(receiveUserAudioSuccess(userAudioList));
        } catch (error) {
            dispatch(receiveUserAudioFailure(error));
        }
    };
};



/********** AUDIO CRUD ACTIONS **************/ 
// Do these need to be async ???
export enum AudioCrudActionType {
    CREATE_AUDIO_DOCUMENT_REQUEST = 'CREATE_AUDIO_DOCUMENT_REQUEST',
    CREATE_AUDIO_DOCUMENT_SUCCESS = 'CREATE_AUDIO_DOCUMENT_SUCCESS',
    CREATE_AUDIO_DOCUMENT_FAILURE = 'CREATE_AUDIO_DOCUMENT_FAILURE',

    READ_AUDIO_DOCUMENT_REQUEST = 'READ_AUDIO_DOCUMENT_REQUEST',
    READ_AUDIO_DOCUMENT_SUCCESS = 'READ_AUDIO_DOCUMENT_SUCCESS',
    READ_AUDIO_DOCUMENT_FAILURE = 'READ_AUDIO_DOCUMENT_FAILURE',
    
    UPDATE_AUDIO_DOCUMENT_REQUEST = 'UPDATE_AUDIO_DOCUMENT_REQUEST',
    UPDATE_AUDIO_DOCUMENT_SUCCESS = 'UPDATE_AUDIO_DOCUMENT_SUCCESS',
    UPDATE_AUDIO_DOCUMENT_FAILURE = 'UPDATE_AUDIO_DOCUMENT_FAILURE',
    
    DELETE_AUDIO_DOCUMENT_REQUEST = 'DELETE_AUDIO_DOCUMENT_REQUEST',
    DELETE_AUDIO_DOCUMENT_SUCCESS = 'DELETE_AUDIO_DOCUMENT_SUCCESS',
    DELETE_AUDIO_DOCUMENT_FAILURE = 'DELETE_AUDIO_DOCUMENT_FAILURE'
}

export interface AudioCrudAction {
    type: AudioCrudActionType;
    audio?: Audio;
    error?: Error;
}

const createAudioDocumentRequest = (): AudioCrudAction => ({
    type: AudioCrudActionType.CREATE_AUDIO_DOCUMENT_REQUEST,
})

const createAudioDocumentSuccess = (audio: Audio): AudioCrudAction => ({
    type: AudioCrudActionType.CREATE_AUDIO_DOCUMENT_SUCCESS,
    audio 
});

const createAudioDocumentFailure = (error: Error): AudioCrudAction => ({
    type: AudioCrudActionType.CREATE_AUDIO_DOCUMENT_FAILURE,
    error
});

export const insertAudioDocument = (audio: Audio) => {
    return async (dispatch: Function) => {
        dispatch(createAudioDocumentRequest());
        try {
            const document = await audioService.addAudio(audio);
            dispatch(createAudioDocumentSuccess(document));
        } catch (error) {
            dispatch(createAudioDocumentFailure(error));
        }
    }
}

const updateAudioRequest = (): AudioCrudAction => ({
    type: AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_REQUEST,
});

const updateAudioSuccess = (audio: Audio): AudioCrudAction => ({ 
    type: AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_SUCCESS,
    audio
});

const updateAudioFailure = (error: Error): AudioCrudAction => ({
    type: AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_FAILURE,
    error
});

export const updateAudio = (audio: Audio) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateAudioRequest()); //TODO: create middleware for loading and blacklist certain actions
        try {
            await audioService.updateAudio(audio);
            dispatch(updateAudioSuccess(audio));
        } catch (error) {
            dispatch(updateAudioFailure(error));
        }
    };
}

const deleteAudioRequest = (audio: Audio): AudioCrudAction => ({
    type: AudioCrudActionType.DELETE_AUDIO_DOCUMENT_REQUEST,
    audio
});

const deleteAudioSuccess = (deletedAudio: Audio): AudioCrudAction => ({
    type: AudioCrudActionType.DELETE_AUDIO_DOCUMENT_SUCCESS,
    audio: deletedAudio
});

const deleteAudioFailure = (error: Error): AudioCrudAction => ({
    type: AudioCrudActionType.DELETE_AUDIO_DOCUMENT_FAILURE,
    error
});

export const deleteAudio = (audio: Audio) => {
    return async (dispatch: Dispatch, getState: Function) => {
        dispatch(deleteAudioRequest(audio));
        try {
            await storageHelper.deleteBlob(audio.storagePath);
            await audioService.deleteAudio(audio);
            dispatch(deleteAudioSuccess(audio));
        } catch (error) {
            dispatch(deleteAudioFailure(error));
        }
    }
};

/*********** AUDIO UPLOAD ACTIONS ***********/

export enum UploadTaskActionType {
    SET_UPLOAD_TASK = 'SET_UPLOAD_TASK',
    UPLOAD_AUDIO_REQUEST = 'UPLOAD_AUDIO_REQUEST',
    UPLOAD_AUDIO_PROGRESS = 'UPLOAD_AUDIO_PROGRESS',
    UPLOAD_AUDIO_SUCCESS = 'UPLOAD_AUDIO_SUCCESS',
    UPLOAD_AUDIO_FAILURE = 'UPLOAD_AUDIO_FAILURE',
}

export interface UploadTaskAction {
    type: UploadTaskActionType;
    isUploading: boolean;
    uploadProgress: number;
    error?: Error;
    audio?: Audio;
    uploadTask: storage.UploadTask;
}

const uploadAudioRequest = () => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_REQUEST
})

const setUploadTask = (uploadTask: storage.UploadTask) => ({
    type: UploadTaskActionType.SET_UPLOAD_TASK,
    uploadTask
});

const setUploadProgress = (uploadProgress: number) => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_PROGRESS,
    uploadProgress  
});

const setUploadError = (error: Error) => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_FAILURE,
    error
});


const completeUpload = (audio: Audio) => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_SUCCESS,
    audio
});


/* Upload Progress Handler */
const onUploadProgress = (snapshot: storage.UploadTaskSnapshot, dispatch: Function) => {
    const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    switch (snapshot.state) {
        case storage.TaskState.RUNNING:
            dispatch(setUploadProgress(uploadProgress));
            break;
    }
}

/* Upload Error Handler */
const onUploadError = (error: Error&{ code: string }, audio: Audio, dispatch: Function) => {
    let message;
    switch (error.code) {
        case 'storage/unauthorized': // User doesn't have permission to access the object
            message = 'Error during upload. User not authorized';
            break;
        case 'storage/canceled': // User canceled the upload
            message = 'Upload has been canceled.'
            break;
        case 'storage/unknown': // Unknown error occurred, inspect error.serverResponse
            message = 'Unknown error ocurred during upload.'
            break;
        default:
            console.error('Upload Error: ', error);
    }
    dispatch(setUploadError(new Error(message)));
    dispatch(deleteAudio(audio));
};

/* Upload Completion Handler */
const onUploadComplete = async (audio: Audio, uploadTask: storage.UploadTask, dispatch: Function, getState: Function) => {
    audio.downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
    const audioElement: HTMLAudioElement = new Audio(audio.downloadUrl);
    audioElement.addEventListener('loadedmetadata', async () => {
        audio.duration = audioElement.duration;
        try {
            /* Nested try/catch is yucky, but necessary to handle document update errors */
            // dispatch(updateAudio(audio)); /* update error doesn't get handled */
            dispatch(updateAudioRequest());
            try {
                await audioService.updateAudio(audio); //failure to update means 
                dispatch(updateAudioSuccess(audio)); 
            } catch (error) {
                dispatch(updateAudioFailure(error));
                throw error;
            }
            dispatch(completeUpload(audio));
        } catch (error) {
            dispatch(setUploadError(error));
            dispatch(deleteAudio(audio));
        }
    });
};

//should this be called something else
export const uploadAudio = (audio: Audio, file: File) => {
    return async (dispatch: Function, getState: Function) => {
        dispatch(uploadAudioRequest());
        let createdDocument;
        try {
            dispatch(createAudioDocumentRequest());
            createdDocument = await audioService.addAudio(audio);
            dispatch(createAudioDocumentSuccess(audio));
        } catch(error) {
            dispatch(setUploadError(error));
            return;
        }
        audio.id = createdDocument.id;
        audio.userId = await authService.getAuth().currentUser.uid;
        audio.storagePath = storageHelper.getAudioStoragePath(audio.userId, createdDocument.id);
        const uploadTask = storageHelper.getUploadTask(audio.storagePath, file);
        dispatch(setUploadTask(uploadTask));
        uploadTask.on(storage.TaskEvent.STATE_CHANGED, 
            (snapshot: storage.UploadTaskSnapshot) => onUploadProgress(snapshot, dispatch), 
            (error: Error|any) => onUploadError(error, audio, dispatch), 
            () => onUploadComplete(audio, uploadTask, dispatch, getState)
        );
    }
}


/******** LIBRARY ************/
export enum AudioFilterActionType {
    SET_AUDIO_LIBRARY_FILTER = 'SET_AUDIO_LIBRARY_FILTER',
}

export interface AudioFilterAction {
    type: AudioFilterActionType,
    filter: AudioFilterAction
}

export const setAudioLibraryFilter = (filter: AudioLibraryFilter) => ({
    type: AudioFilterActionType.SET_AUDIO_LIBRARY_FILTER,
    filter
});