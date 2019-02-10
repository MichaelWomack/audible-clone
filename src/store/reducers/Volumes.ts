import { VolumeAction, VolumeActionTypes } from '../actions/Volumes';
import { VolumeInfo } from '../../model/volume';

const initialState = {
    selectedVolume: null as VolumeInfo,
    volumes: [] as Array<VolumeInfo>,
    error: null as Error
};

export const volumes = (state = initialState, action: VolumeAction) => {
    switch (action.type) {
        case VolumeActionTypes.SET_SELECTED_VOLUME:
            return {
                ...state,
                selectedVolume: action.selectedVolume
            };
        case VolumeActionTypes.CLEAR_VOLUMES:
            return {
                ...state,
                volumes: []
            };
        case VolumeActionTypes.FETCH_VOLUMES_REQUEST:
            return {
                ...state,
            };
        case VolumeActionTypes.FETCH_VOLUMES_SUCCESS:
            return {
                ...state,
                volumes: action.volumes
            };
        case VolumeActionTypes.FETCH_VOLUMES_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};