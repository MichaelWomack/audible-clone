import { Audio, AudioLibraryFilter, AudioMap, SleepTimer } from "./audio";
import { firestore, storage } from "firebase";
import { VolumeInfo } from "./volume";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { BannerType } from "../config/constants";
import { UserSettings } from "./user";


export interface AudioState {
    library: AudioMap;
    filter: AudioLibraryFilter;
    createdDocument: firestore.DocumentReference;
    isLoading: boolean;
    isUploading: boolean;
    uploadComplete: boolean;
    uploadTasks: storage.UploadTask[];
    uploadProgress: number;
    completedUploads: number;
    totalBytesUploaded: number;
    totalBytesToUpload: number;
}

export interface VolumeState {
    selectedVolume?: VolumeInfo;
    volumes: VolumeInfo[];
    isLoading?: boolean;
}

export interface UiState {
    isLoading: boolean,
    snackbarMessage: string,
    snackbarOpen: boolean,
    themeOptions: ThemeOptions,
    error: Error
    bannerOpen: boolean;
    bannerType: BannerType;
    bannerMessage: string;
}

export interface PlayerState {
    isPlaying: boolean,
    isShowing: boolean,
    fullscreen: boolean,
    speed: number,
    audio: Audio,
    sleepTimer: SleepTimer;
}

export interface UserState {
    user: firebase.User,
    settings: UserSettings;
}

export interface ReduxState {
    audio?: AudioState,
    volumes?: VolumeState,
    ui?: UiState,
    player?: PlayerState,
    user?: UserState
}