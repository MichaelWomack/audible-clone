import * as React from 'react';
import PlayIcon from '@material-ui/icons/PlayArrowSharp';
import PauseIcon from '@material-ui/icons/PauseSharp';
import AudioPlayerWrapped, { AudioPlayer, AudioPlayerProps, AudioPlayerState } from './AudioPlayer';
import { mapStateToProps } from './index';
import { Audio } from '../../model/audio';
import { mount, ReactWrapper } from 'enzyme';
import { PlayerState, ReduxState } from "../../model/state";

describe('<AudioPlayer/>', () => {
    let wrapper: ReactWrapper<AudioPlayerProps, AudioPlayerState>;
    let component: ReactWrapper<AudioPlayerProps, AudioPlayerState>;

    let audio: Audio;
    let togglePlaying: Function;
    let playAudio: Function;
    let pauseAudio: Function;
    let showPlayer: () => void;
    let hidePlayer: () => void;
    let nextTrack: () => void;
    let previousTrack: () => void;
    let setTrack: (track: number) => void;
    let setPlaybackSpeed: (speed: number) => void;
    let setSleepTimer: (duration: number) => void;
    let clearSleepTimer: () => void;
    let openFullscreen: () => void;
    let closeFullscreen: () => void;
    let updateAudio: (audio: Audio) => void;
    let player: PlayerState;

    let getComponent: Function;

    beforeEach(() => {
        audio = {
            id: '1',
            title: 'A Game of Thrones',
            currentTrack: 0,
            trackList: [{ downloadUrl: 'https://my-audio.net', duration: 60 }]
        };

        togglePlaying = jest.fn();
        playAudio = jest.fn();
        pauseAudio = jest.fn();
        showPlayer = jest.fn();
        hidePlayer = jest.fn();
        nextTrack = jest.fn();
        previousTrack = jest.fn();
        setTrack = jest.fn();
        setPlaybackSpeed = jest.fn();
        setSleepTimer = jest.fn();
        clearSleepTimer = jest.fn();
        openFullscreen = jest.fn();
        closeFullscreen = jest.fn();
        updateAudio = jest.fn();

        player = {
            isPlaying: false,
            isShowing: false,
            fullscreen: false,
            speed: 1,
            audio,
            sleepTimer: null
        };

        getComponent = () =>
            <AudioPlayerWrapped
                audio={audio}
                togglePlaying={togglePlaying}
                playAudio={playAudio}
                pauseAudio={pauseAudio}
                showPlayer={showPlayer}
                hidePlayer={hidePlayer}
                nextTrack={nextTrack}
                previousTrack={previousTrack}
                setTrack={setTrack}
                setPlaybackSpeed={setPlaybackSpeed}
                setSleepTimer={setSleepTimer}
                clearSleepTimer={clearSleepTimer}
                openFullscreen={openFullscreen}
                closeFullscreen={closeFullscreen}
                updateAudio={updateAudio}
                player={player}
            />;

        wrapper = mount(getComponent());
        component = wrapper.find(AudioPlayer);
        HTMLMediaElement.prototype.play = jest.fn();
        HTMLMediaElement.prototype.pause = jest.fn();
    });

    afterEach(() => {
        wrapper.unmount();
        jest.resetAllMocks();
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
        expect(component.exists()).toBe(true);
    });

    it('shows the play icon when isPlaying is false and toggles on click', () => {
        expect(wrapper.props().player.isPlaying).toBe(false);
        expect(wrapper.find(PlayIcon).length).toBe(1);
        expect(wrapper.find(PauseIcon).length).toBe(0);
        wrapper.find(`IconButton[data-test="toggle-playing"]`).simulate('click');
        expect(playAudio).toHaveBeenCalled();
    });

    it('shows the pause icon when isPlaying is true and toggles on click', () => {
        const props = { ...wrapper.props(), player: { ...player, isPlaying: true } };
        wrapper.setProps(props);
        expect(wrapper.props().player.isPlaying).toBe(true);
        expect(wrapper.find(PlayIcon).length).toBe(0);
        expect(wrapper.find(PauseIcon).length).toBe(1);
        wrapper.find(`IconButton[data-test="toggle-playing"]`).simulate('click');
        expect(pauseAudio).toHaveBeenCalled();
    });

    describe('#mapStateToProps', () => {
        it('assigns the necessary items from state', () => {
            const state: ReduxState = {
                player: {
                    isPlaying: true,
                    isShowing: true,
                    fullscreen: true,
                    audio: {},
                    speed: 0,
                    sleepTimer: null
                }
            };
            const props = mapStateToProps(state);
            expect(props.isPlaying).toBe(true);
            expect(props.isShowing).toBe(true);
            expect(props.fullscreen).toBe(true);
            expect(props.audio).toEqual({});
        });
    });
});
