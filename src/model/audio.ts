
export enum AudioType {
    MUSIC,
    AUDIOBOOK,
    PODCAST,
    OTHER
}


export interface Audio {
    id?: string;
    userId?: string;
    title?: string;
    subtitle?: string;
    author?: string;
    favorite?: boolean;
    storagePath?: string;
    downloadUrl?: string;
    imageUrl?: string;
    currentTime?: number;
    lastPlayed?: Date; 
    duration?: number;
    multipartIndex?: number;
}

export interface AudioBook extends Audio {
    title?: string;
    subtitle?: string;
    author?: string;
    description?: string;
}

export type AudioMap = { [ key: string ] : Audio };