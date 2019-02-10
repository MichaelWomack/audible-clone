import {
    FetchAudioAction,
    FetchAudioActionType,
    UploadTaskAction,
    UploadTaskActionType,
    AudioCrudAction,
    AudioCrudActionType
} from '../actions/Audio';
import { Audio, AudioMap } from '../../model/audio';
import { storage } from 'firebase';

type AudioAction = FetchAudioAction | UploadTaskAction | AudioCrudAction;

const defaultState = {
    library: {} as AudioMap,
    isLoading: false,
    error: null as any,
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
                createdDocument: action.createdDocument
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

        /********* UPLOAD AUDIO **********/
        case UploadTaskActionType.SET_UPLOAD_TASK:
            return {
                ...state,
                uploadTask: action.uploadTask
            }
        case UploadTaskActionType.UPLOAD_AUDIO_REQUEST:
            return {
                ...state,
                isUploading: true,
                uploadProgress: 0
            };
        case UploadTaskActionType.UPLOAD_AUDIO_PROGRESS:
            return {
                ...state,
                isUploading: true,
                uploadProgress: action.uploadProgress
            };
        case UploadTaskActionType.UPLOAD_AUDIO_SUCCESS:
            return {
                ...state,
                isUploading: false,
                uploadTask: null as storage.UploadTask,
                uploadProgress: null as number,
                library: action.library
            };
        case UploadTaskActionType.UPLOAD_AUDIO_FAILURE:
            return {
                ...state,
                isUploading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
