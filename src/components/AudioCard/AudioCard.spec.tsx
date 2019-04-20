import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import AudioCard, { AudioCardProps } from './index';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { Audio } from "../../model/audio";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


describe('AudioCard', () => {

    let wrapper: ReactWrapper;

    const audio: Audio = {
        favorite: false
    };

    let playAudio: (audio: Audio) => void;
    let pauseAudio: () => void;
    let updateAudio: (audio: Audio) => void;
    let deleteAudio: (audio: Audio) => void;

    beforeEach(() => {
        playAudio = jest.fn();
        pauseAudio = jest.fn();
        updateAudio = jest.fn();
        deleteAudio = jest.fn();
        wrapper = mount(
            <AudioCard
                playAudio={playAudio}
                pauseAudio={pauseAudio}
                updateAudio={updateAudio}
                deleteAudio={deleteAudio}
                isCurrentlyPlaying={false}
                audio={audio}
            />
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('toggles favorite icon', () => {
        expect((wrapper.props() as AudioCardProps).audio.favorite).toBe(false);
        expect(wrapper.find(FavoriteBorder).length).toBe(1);

        wrapper.setProps({ audio: { favorite: true } });
        expect((wrapper.props() as AudioCardProps).audio.favorite).toBe(true);
        expect(wrapper.find(Favorite).length).toBe(1);
    });

    it('plays audio on play icon click when paused', () => {
        wrapper.find(PlayArrowIcon).simulate('click');
        expect(playAudio).toHaveBeenCalled();
    });

    it('pauses audio when playing', () => {
        wrapper = mount(
            <AudioCard
                playAudio={playAudio}
                pauseAudio={pauseAudio}
                updateAudio={updateAudio}
                deleteAudio={deleteAudio}
                isCurrentlyPlaying={true}
                audio={audio}
            />
        );
        wrapper.find(PauseIcon).simulate('click');
        expect(pauseAudio).toHaveBeenCalled();
    });
});