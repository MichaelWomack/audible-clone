import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import AudioListWrapped from './index';
import { AudioList, AudioListProps } from './index';
import { Audio, AudioLibraryFilter } from "../../model/audio";
import { AudioCard } from "../AudioCard";

describe("<AudioList />", () => {

    let wrapper: ReactWrapper<AudioListProps>;
    let component: ReactWrapper<AudioListProps>;
    let instance: AudioList;

    let audioList = [
        { id: '1', name: 'Audio 1' },
        { id: '2', name: 'Audio 2' },
    ];

    let playAudio: (audio: Audio) => void;
    let pauseAudio: () => void;
    let updateAudio: (audio: Audio) => void;
    let deleteAudio: (audio: Audio) => void;

    beforeEach(() => {
        playAudio = jest.fn();
        pauseAudio = jest.fn();
        updateAudio = jest.fn();
        deleteAudio = jest.fn();

        wrapper = mount(<AudioListWrapped
            audioList={audioList}
            selectedAudioId="1"
            isPlaying={false}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            updateAudio={updateAudio}
            deleteAudio={deleteAudio}
        />);
        component = wrapper.find(AudioList);
        instance = component.instance() as AudioList;
    });

    it("renders successfully", () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find(AudioCard).length).toBe(2);
    });

    it('renders a message when there is no audio in the list', () => {
        wrapper = mount(<AudioListWrapped
            audioList={[]}
            selectedAudioId="1"
            isPlaying={false}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            updateAudio={updateAudio}
            deleteAudio={deleteAudio}
        />);
        expect(wrapper.find(AudioCard).length).toBe(0);
        expect(wrapper.find('Typography[data-test="no-audio-title"]').text()).toBe("Looks like you need to upload some audiobooks!");
    });

    it('changes the filter to "FAVORITE"', () => {
        expect(instance.state.filter).toBe(AudioLibraryFilter.ALL);
        wrapper.find(`Tab[data-test="favorite-tab"]`).simulate('click');
        wrapper.update();
        expect(instance.state.filter).toBe(AudioLibraryFilter.FAVORITE);
    });

    it('changes the filter to "COMPLETE" on click', () => {
        expect(instance.state.filter).toBe(AudioLibraryFilter.ALL);
        wrapper.find(`Tab[data-test="complete-tab"]`).simulate('click');
        wrapper.update();
        expect(instance.state.filter).toBe(AudioLibraryFilter.COMPLETE);
    });
});