import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { FullScreenAudioPlayer, FullScreenAudioPlayerProps } from "./index";

describe('<FullScreenAudioPlayer />', () => {
    let wrapper: ReactWrapper<FullScreenAudioPlayerProps, {}, FullScreenAudioPlayer>;
    let props: any;

    beforeEach(() => {
        props = {
            onClose: jest.fn(),
            onOpen: jest.fn(),
            nextTrack: jest.fn(),
            previousTrack: jest.fn(),
            setTrack: jest.fn(),
            setPlaybackSpeed: jest.fn(),
            playbackSpeed: jest.fn(),
            setCurrentTime: jest.fn(),
            setSleepTimer: jest.fn(),
            sleepTimer: jest.fn(),
            sleepTimerMinutesLeft: 0,
            isOpen: false,
            audio: {},
            forward: jest.fn(),
            replay: jest.fn(),
            play: jest.fn(),
            pause: jest.fn(),
            isPlaying: false,
            audioRef: {}
        };
        wrapper = mount(
            <FullScreenAudioPlayer
                {...props}
            />
        );
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
    });
});