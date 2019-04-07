import { Audio, AudioLibraryFilter } from '../../model/audio';
import { audioService, storageHelper, authService } from '../../services';
import { storage } from 'firebase';
import { Dispatch } from 'redux';
import { ReduxState } from '../../model/state';
import { AudioUtils } from '../../utils/AudioUtils';

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
            audio.trackList.forEach(async (track) => {
                await storageHelper.deleteBlob(track.storagePath);
            });
            await audioService.deleteAudio(audio);
            dispatch(deleteAudioSuccess(audio));
        } catch (error) {
            dispatch(deleteAudioFailure(error));
        }
    }
};

/*********** AUDIO UPLOAD ACTIONS ***********/

export enum UploadTaskActionType {
    SET_UPLOAD_TASKS = 'SET_UPLOAD_TASKS',
    SET_COMPLETED_UPLOADS = 'SET_COMPLETED_UPLOADS',
    UPLOAD_AUDIO_REQUEST = 'UPLOAD_AUDIO_REQUEST',
    UPLOAD_AUDIO_PROGRESS = 'UPLOAD_AUDIO_PROGRESS',
    UPLOAD_AUDIO_SUCCESS = 'UPLOAD_AUDIO_SUCCESS',
    UPLOAD_AUDIO_FAILURE = 'UPLOAD_AUDIO_FAILURE',
    CLEAR_UPLOAD_STATUS = 'CLEAR_UPLOAD_STATUS'
}

export interface UploadTaskAction {
    type: UploadTaskActionType;
    isUploading: boolean;
    uploadProgress: number;
    error?: Error;
    audio?: Audio;
    uploadTasks: storage.UploadTask[];
    completedUploads: number;
    totalBytesUploaded: number;
    totalBytesToUpload: number;
}

const uploadAudioRequest = () => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_REQUEST
})

const setUploadTasks = (uploadTasks: storage.UploadTask[]) => ({
    type: UploadTaskActionType.SET_UPLOAD_TASKS,
    uploadTasks
});

const setUploadsCompleted = (completedUploads: number) => ({
    type: UploadTaskActionType.SET_COMPLETED_UPLOADS,
    completedUploads
});

const setUploadProgress = (totalBytesUploaded: number, totalBytesToUpload: number) => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_PROGRESS,
    totalBytesUploaded,
    totalBytesToUpload,
});

const setUploadError = (error: Error) => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_FAILURE,
    error
});


const completeUpload = (audio: Audio) => ({
    type: UploadTaskActionType.UPLOAD_AUDIO_SUCCESS,
    audio
});

export const clearUploadStatus = () => ({
    type: UploadTaskActionType.CLEAR_UPLOAD_STATUS
});

/* Upload Progress Handler */
const onUploadProgress = (snapshot: storage.UploadTaskSnapshot, dispatch: Function, getState: Function) => {
    const { audio: { uploadTasks } } : ReduxState = getState();
    const { totalBytesTransferred, totalBytes } = calculateTotalProgress(uploadTasks);
    switch (snapshot.state) {
        case storage.TaskState.RUNNING:
            dispatch(setUploadProgress(totalBytesTransferred, totalBytes));
            break;
    }
}

const calculateTotalProgress = (uploadTasks: storage.UploadTask[]) => {
    return uploadTasks.reduce(({ totalBytesTransferred, totalBytes }, task: storage.UploadTask) => {
        return { 
            totalBytesTransferred: totalBytesTransferred + task.snapshot.bytesTransferred, 
            totalBytes: totalBytes + task.snapshot.totalBytes
        };
    }, { totalBytesTransferred: 0, totalBytes: 0 });
};

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
const onUploadComplete = async (audio: Audio, index: number, dispatch: Function, getState: Function) => {
    const state: ReduxState = getState();
    const { uploadTasks } = state.audio;
    const uploadTask = uploadTasks[index];
    const uploadedTrack = audio.trackList[index];
    uploadedTrack.downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
    uploadedTrack.storagePath = uploadTask.snapshot.ref.fullPath;
    const audioElement: HTMLAudioElement = new Audio(uploadedTrack.downloadUrl);

    const onMetaDataLoaded = function () {
        uploadedTrack.duration = audioElement.duration;
        uploadedTrack.currentTime = 0;
        audio.trackList[index] = uploadedTrack;
        const newTotalCompleted = uploadTasks.reduce((totalComplete: number, uploadTask: storage.UploadTask) => {
            return uploadTask.snapshot.state === storage.TaskState.SUCCESS ? ++totalComplete : totalComplete;
        }, 0);
        dispatch(setUploadsCompleted(newTotalCompleted));
        if (newTotalCompleted === uploadTasks.length) {
            const { totalDuration } = AudioUtils.getListeningProgress(audio);
            audio.totalProgress = 0;
            audio.totalDuration = totalDuration;
            finalizeUploads(audio, dispatch);
        }
    };
    audioElement.addEventListener('loadedmetadata', onMetaDataLoaded);
};

const finalizeUploads = async (audio: Audio, dispatch: Function) => {
    console.log('finalizeUploads()');
    try {
        /* Nested try/catch is yucky, but necessary to handle document update errors */
        dispatch(updateAudio(audio)); /* update error doesn't get handled */
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
};

//should this be called something else
export const uploadAudio = (audio: Audio, files: File[]) => {
    return async (dispatch: Function, getState: Function) => {
        const state: ReduxState = getState();
        dispatch(uploadAudioRequest());
        let createdDocument;
        try {
            dispatch(createAudioDocumentRequest());
            /** needs to be on all documents for firebase security rules */
            audio.userId = state.user.user.uid;
            createdDocument = await audioService.addAudio(audio);
            dispatch(createAudioDocumentSuccess(audio));
        } catch(error) {
            dispatch(setUploadError(error));
            return;
        }
        audio.id = createdDocument.id;
        audio.storagePath = storageHelper.getAudioStoragePath(audio.userId, createdDocument.id);
        audio.currentTrack = 0;
        audio.trackList = [];

        let totalBytesUploaded = 0, totalBytesToUpload = 0;
        const uploadTasks = files.map((file: File) => {
            audio.trackList.push({ 
                fileName: file.name
            });
            const uploadTask = storageHelper.getUploadTask(audio.storagePath, file);
            totalBytesUploaded += uploadTask.snapshot.bytesTransferred;
            totalBytesToUpload += uploadTask.snapshot.totalBytes;
            return uploadTask;
        });
        console.log('uploadAudio() => total bytes to upload ', totalBytesToUpload);
        dispatch(setUploadProgress(totalBytesUploaded, totalBytesToUpload));
        dispatch(setUploadTasks(uploadTasks)); //I don't think this is necessary

        uploadTasks.forEach((uploadTask: storage.UploadTask, index: number) => {
            uploadTask.on(storage.TaskEvent.STATE_CHANGED, 
                (snapshot: storage.UploadTaskSnapshot) => onUploadProgress(snapshot, dispatch, getState), 
                (error: Error|any) => onUploadError(error, audio, dispatch), 
                () => onUploadComplete(audio, index, dispatch, getState)
            );
        });
    }
};


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