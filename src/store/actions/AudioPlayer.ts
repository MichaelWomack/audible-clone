import { AudioBook, Audio } from "../../model/audio";

export enum PlayerActionType {
    PLAY_AUDIO = 'PLAY_AUDIO',
    PAUSE_AUDIO = 'PAUSE_AUDIO',
    AUDIO_TOGGLE_PLAYING = 'AUDIO_TOGGLE_PLAYING',
    SET_AUDIO = 'SET_AUDIO',
    NEXT_TRACK = 'NEXT_TRACK',
    PREVIOUS_TRACK = 'PREVIOUS_TRACK',
    SHOW_PLAYER = 'SHOW_PLAYER',
    HIDE_PLAYER = 'HIDE_PLAYER',
    OPEN_FULLSCREEN = 'OPEN_FULLSCREEN',
    CLOSE_FULLSCREEN = 'CLOSE_FULLSCREEN'
}

export interface PlayerAction {
    type: PlayerActionType;
    audio?: AudioBook;
}

export const playAudio = () => ({
    type: PlayerActionType.PLAY_AUDIO,
});

export const pauseAudio = () => ({
    type: PlayerActionType.PAUSE_AUDIO
});

export const setAudio = (audio: Audio) => ({
    type: PlayerActionType.SET_AUDIO,
    audio
});

export const showPlayer = () => ({
    type: PlayerActionType.SHOW_PLAYER
});

export const hidePlayer = () => ({
    type: PlayerActionType.HIDE_PLAYER
});

export const openFullscreen = () => ({
    type: PlayerActionType.OPEN_FULLSCREEN
});

export const closeFullscreen = () => ({
    type: PlayerActionType.CLOSE_FULLSCREEN
});

export const togglePlaying = (): PlayerAction => ({
    type: PlayerActionType.AUDIO_TOGGLE_PLAYING
});

export const nextTrack = (): PlayerAction => ({
    type: PlayerActionType.NEXT_TRACK,
});

export const previousTrack = (): PlayerAction => ({
    type: PlayerActionType.PREVIOUS_TRACK,
});


