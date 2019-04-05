
export enum AudioType {
    MUSIC,
    AUDIOBOOK,
    PODCAST,
    OTHER
}

export interface AudioFile {
    fileName?: string; //could be chapter name, etc.
    downloadUrl?: string;
    storagePath?: string;
    currentTime?: number;
    duration?: number;
    lastPlayed?: number;
}

export interface Audio {
    id?: string;
    userId?: string;
    title?: string;
    subtitle?: string;
    author?: string;
    description?: string;
    favorite?: boolean;
    trackList?: AudioFile[];
    storagePath?: string;
    imageUrl?: string;
    currentTime?: number;
    lastPlayed?: number;
    lastUpdated?: number;
    duration?: number;
    totalProgress?: number;
    totalDuration?: number;
    currentTrack?: number;
}

export interface SleepTimer {
    duration: number;
    dateSet: Date;
}

export interface AudioBook extends Audio {
    title?: string;
    subtitle?: string;
    author?: string;
    // description?: string;
}

export enum AudioLibraryFilter {
    ALL,
    FAVORITE,
    COMPLETE,
    RECENT
}

export type AudioMap = { [ key: string ] : Audio };