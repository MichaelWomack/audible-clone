import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import AudioCardWrapped, { AudioCard, AudioCardProps, AudioCardState } from './index';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Audio } from "../../model/audio";


describe('AudioCard', () => {

    let wrapper: ReactWrapper<AudioCardProps, AudioCardState>;
    let component: ReactWrapper<AudioCardProps, AudioCardState>;

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
            <AudioCardWrapped
                playAudio={playAudio}
                pauseAudio={pauseAudio}
                updateAudio={updateAudio}
                deleteAudio={deleteAudio}
                isCurrentlyPlaying={false}
                audio={audio}
            />
        );
        component = wrapper.find(AudioCard);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('toggles favorite icon and updates the audio', () => {
        expect(wrapper.props().audio.favorite).toBe(false);
        expect(component.state().isFavorite).toBe(false);
        expect(wrapper.find(FavoriteBorder).length).toBe(1);

        wrapper.find('IconButton[data-test="toggle-favorite"]').simulate('click');
        expect(wrapper.props().audio.favorite).toBe(true);
        expect(component.state().isFavorite).toBe(true);
        expect(wrapper.find(Favorite).length).toBe(1);

        wrapper.find('IconButton[data-test="toggle-favorite"]').simulate('click');
        expect(wrapper.props().audio.favorite).toBe(false);
        expect(component.state().isFavorite).toBe(false);
        expect(wrapper.find(FavoriteBorder).length).toBe(1);

        expect(updateAudio).toHaveBeenCalledWith(wrapper.props().audio);
        expect(updateAudio).toHaveBeenCalledTimes(2);
    });

    it('plays audio on play icon click when paused', () => {
        wrapper.find(PlayArrowIcon).simulate('click');
        expect(playAudio).toHaveBeenCalled();
    });

    it('pauses audio when playing', () => {
        wrapper = mount(
            <AudioCardWrapped
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

    it('opens the info dialog on icon click', () => {
        expect(component.state().showInfoDialog).toBe(false);
        component.find('IconButton[data-test="open-info-dialog"]').simulate('click');
        expect(component.state().showInfoDialog).toBe(true);
    });

    it('opens the delete audio dialog on icon click', () => {
        expect(component.state().showDeleteDialog).toBe(false);
        component.find('IconButton[data-test="open-delete-dialog"]').simulate('click');
        expect(component.state().showDeleteDialog).toBe(true);
    });
});
