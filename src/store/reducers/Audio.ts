import {
    FetchAudioAction,
    FetchAudioActionType,
    UploadTaskAction,
    UploadTaskActionType,
    AudioCrudAction,
    AudioCrudActionType,
    AudioFilterActionType,
    AudioFilterAction
} from '../actions/Audio';
import { Audio, AudioMap, AudioLibraryFilter } from '../../model/audio';
import { storage } from 'firebase';

type AudioAction = FetchAudioAction | UploadTaskAction | AudioCrudAction | AudioFilterAction;

const defaultState = {
    library: {} as AudioMap,
    isLoading: false,
    error: null as any,
    filter: AudioLibraryFilter.ALL,
    completedUploads: 0,
};

export const audio = (state = defaultState, action: AudioAction) => {
    switch (action.type) {
        /* FETCH AUDIO */
        case FetchAudioActionType.FETCH_USER_AUDIO_REQUEST:
            return state;

        case FetchAudioActionType.FETCH_USER_AUDIO_SUCCESS:   
            const audioById = action.library.reduce((acc: AudioMap, audio: Audio) => {
                acc[audio.id] = audio;
                return acc;
            }, {});
            return {
                ...state,
                library: audioById
            };
        case FetchAudioActionType.FETCH_USER_AUDIO_FAILURE:
            return {
                ...state,
                error: action.error,
            };

        /* AUDIO CRUD */
        case AudioCrudActionType.CREATE_AUDIO_DOCUMENT_REQUEST:
            return {
                ...state,
                audio: action.audio
            };
        case AudioCrudActionType.CREATE_AUDIO_DOCUMENT_SUCCESS:
            return {
                ...state,
                audio: action.audio
            };
        case AudioCrudActionType.CREATE_AUDIO_DOCUMENT_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_SUCCESS:
            return {
                ...state,
                library: {...state.library, [action.audio.id]: action.audio }
            }
        case AudioCrudActionType.UPDATE_AUDIO_DOCUMENT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case AudioCrudActionType.DELETE_AUDIO_DOCUMENT_REQUEST:
            return {
                ...state,
                audio: action.audio
            };

        case AudioCrudActionType.DELETE_AUDIO_DOCUMENT_SUCCESS:
            const library = state.library;
            delete library[action.audio.id];
            return {
                ...state,
                ...library
            };

        case AudioCrudActionType.DELETE_AUDIO_DOCUMENT_FAILURE:
            return state;

        /********* UPLOAD AUDIO **********/
        case UploadTaskActionType.SET_UPLOAD_TASKS:
            return {
                ...state,
                uploadTasks: action.uploadTasks
            }
        case UploadTaskActionType.SET_COMPLETED_UPLOADS:
            return {
                ...state,
                completedUploads: action.completedUploads
            };
        case UploadTaskActionType.UPLOAD_AUDIO_REQUEST:
            return {
                ...state,
                isUploading: true,
                uploadProgress: 0
            };
        case UploadTaskActionType.UPLOAD_AUDIO_PROGRESS:
            const value = ( action.totalBytesUploaded / action.totalBytesToUpload) * 100;
            console.log('upload progress => ', value);
            return {
                ...state,
                isUploading: true,
                uploadProgress: value,
                totalBytesUploaded: action.totalBytesUploaded,
                totalBytesToUpload: action.totalBytesToUpload
            };
        case UploadTaskActionType.UPLOAD_AUDIO_SUCCESS:
            return {
                ...state,
                isUploading: false,
                uploadTask: null as storage.UploadTask,
                uploadProgress: null as number,
            };
        case UploadTaskActionType.UPLOAD_AUDIO_FAILURE:
            return {
                ...state,
                isUploading: false,
                error: action.error,
            };

        /** LIBRARY FILTER ACTIONS */
        case AudioFilterActionType.SET_AUDIO_LIBRARY_FILTER:
            return {
                ...state,
                filter: action.filter
            };
        default:
            return state;
    }
};
