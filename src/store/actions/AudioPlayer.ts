import { AudioBook, Audio, SleepTimer } from "../../model/audio";

export enum PlayerActionType {
    PLAY_AUDIO = 'PLAY_AUDIO',
    PAUSE_AUDIO = 'PAUSE_AUDIO',
    AUDIO_TOGGLE_PLAYING = 'AUDIO_TOGGLE_PLAYING',
    SET_AUDIO = 'SET_AUDIO',
    NEXT_TRACK = 'NEXT_TRACK',
    PREVIOUS_TRACK = 'PREVIOUS_TRACK',
    SET_TRACK = 'SET_TRACK',
    SET_SLEEP_TIMER = 'SET_SLEEP_TIMER',
    CLEAR_SLEEP_TIMER = 'CLEAR_SLEEP_TIMER',
    SET_PLAYBACK_SPEED = 'SET_PLAYBACK_SPEED',
    SHOW_PLAYER = 'SHOW_PLAYER',
    HIDE_PLAYER = 'HIDE_PLAYER',
    OPEN_FULLSCREEN = 'OPEN_FULLSCREEN',
    CLOSE_FULLSCREEN = 'CLOSE_FULLSCREEN'
}

export interface PlayerAction {
    type: PlayerActionType;
    audio?: AudioBook;
    track?: number;
    speed?: number;
    sleepTimer?: SleepTimer;
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

export const setTrack = (track: number): PlayerAction => ({
    type: PlayerActionType.SET_TRACK,
    track: track
});

export const setPlaybackSpeed = (speed: number): PlayerAction => ({
    type: PlayerActionType.SET_PLAYBACK_SPEED,
    speed
});

export const setSleepTimer = (duration: number): PlayerAction => ({
    type: PlayerActionType.SET_SLEEP_TIMER,
    sleepTimer: {
        duration,
        dateSet: new Date()
    }
});

export const clearSleepTimer = (): PlayerAction => ({
    type: PlayerActionType.CLEAR_SLEEP_TIMER
});


