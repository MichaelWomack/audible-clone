import { VolumeInfo } from "../../model/volume";
import { booksSearch } from "../../services";
import { Dispatch } from "redux";

export enum VolumeActionTypes {
    SET_SELECTED_VOLUME = 'SET_SELECTED_VOLUME',
    FETCH_VOLUMES_REQUEST = 'FETCH_VOLUMES_REQUEST',
    FETCH_VOLUMES_SUCCESS = 'FETCH_VOLUMES_SUCCESS',
    FETCH_VOLUMES_FAILURE = 'FETCH_VOLUMES_FAILURE',
    CLEAR_VOLUMES = 'CLEAR_VOLUMES',
}

export interface VolumeAction {
    type: VolumeActionTypes,
    selectedVolume?: VolumeInfo,
    volumes?: Array<VolumeInfo>,
    error?: Error
}

export const setSelectedVolume = (selectedVolume: VolumeInfo): VolumeAction => {
    return {
        type: VolumeActionTypes.SET_SELECTED_VOLUME,
        selectedVolume
    };
};

export const clearVolumes = () => ({
    type: VolumeActionTypes.CLEAR_VOLUMES
});

/************* FETCH VOLUMES ****************/
const fetchVolumesRequest = () => {
    return {
        type: VolumeActionTypes.FETCH_VOLUMES_REQUEST,
    };
}

const fetchVolumesSuccess = (volumes: Array<VolumeInfo>) => {
    return {
        type: VolumeActionTypes.FETCH_VOLUMES_SUCCESS,
        volumes
    };
}

const fetchVolumesFailure = (error: Error) => {
    return {
        type: VolumeActionTypes.FETCH_VOLUMES_FAILURE,
        error
    };
}

export const searchBooks = (query: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchVolumesRequest());
        try {
            const response = await booksSearch.searchBookInfo(query);
            const volumes: Array<VolumeInfo> = response.data.items.map((item: any) => ({id: item.id, ...item.volumeInfo}));
            dispatch(fetchVolumesSuccess(volumes));
        } catch (error) {
            console.error(error);
            dispatch(fetchVolumesFailure(error));
        }
    }
};

