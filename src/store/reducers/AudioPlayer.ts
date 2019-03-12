import { Audio, SleepTimer } from "../../model/audio";
import { PlayerAction, PlayerActionType } from '../actions/AudioPlayer';

export const defaultState = {
    audio: null as Audio,
    isPlaying: false,
    isShowing: false,
    fullscreen: false,
    speed: 1,
    sleepTimer: null as SleepTimer
};

export const player = (state = defaultState, action: PlayerAction) => {
    const { audio } = state;
    switch (action.type) {
        case PlayerActionType.AUDIO_TOGGLE_PLAYING:
            return {
                ...state,
                isPlaying: !state.isPlaying
            };
        case PlayerActionType.SET_AUDIO:
            return {
                ...state,
                audio: action.audio,
                isPlaying: true,
                isShowing: true,
            };
        case PlayerActionType.SHOW_PLAYER:
            return {
                ...state,
                isShowing: true,
            };
        case PlayerActionType.HIDE_PLAYER:
            return {
                ...state,
                isShowing: false,
            };
        case PlayerActionType.OPEN_FULLSCREEN:
            return {
                ...state,
                fullscreen: true
            };
        case PlayerActionType.CLOSE_FULLSCREEN:
            return {
                ...state,
                fullscreen: false
            };
        case PlayerActionType.PAUSE_AUDIO:
            return {
                ...state,
                isPlaying: false,
            };
        case PlayerActionType.PLAY_AUDIO:
            return {
                ...state,
                isPlaying: Boolean(state.audio) // only play if there is already selected audio
            };
        case PlayerActionType.NEXT_TRACK:
            audio.currentTrack = ++audio.currentTrack % audio.trackList.length;
            return {
                ...state,
                audio
            };
        case PlayerActionType.PREVIOUS_TRACK:
            audio.currentTrack = audio.currentTrack - 1 < 0 ? 0 : audio.currentTrack - 1;
            return {
                ...state,
                audio
            };
        case PlayerActionType.SET_TRACK:
            audio.currentTrack = action.track;
            return {
                ...state,
                isPlaying: true,
                audio
            };
        case PlayerActionType.SET_PLAYBACK_SPEED:
            return {
                ...state,
                speed: action.speed
            };
        case PlayerActionType.SET_SLEEP_TIMER:
            return {
                ...state,
                sleepTimer: action.sleepTimer
            };
        case PlayerActionType.CLEAR_SLEEP_TIMER:
            return {
                ...state,
                sleepTimer: null,
            };
        default:
            return state;
    }
};
