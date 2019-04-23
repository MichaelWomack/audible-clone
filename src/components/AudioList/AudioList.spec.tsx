import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ToggleButton from "@material-ui/lab/ToggleButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckIcon from '@material-ui/icons/Done';
import AudioListWrapped from './index';
import { AudioList, AudioListProps } from './index';
import { Audio, AudioLibraryFilter } from "../../model/audio";
import { AudioCard } from "../AudioCard";

describe("<AudioList />", () => {

    let wrapper: ReactWrapper<AudioListProps>;
    let component: ReactWrapper<AudioListProps>;

    let audioList = [
        { id: '1', name: 'Audio 1'},
        { id: '2', name: 'Audio 2'},
    ];

    let playAudio: (audio: Audio) => void;
    let pauseAudio: () => void;
    let updateAudio: (audio: Audio) => void;
    let deleteAudio: (audio: Audio) => void;
    let setAudioFilter: (filter: AudioLibraryFilter) => void;

    beforeEach(() => {
        playAudio = jest.fn();
        pauseAudio = jest.fn();
        updateAudio = jest.fn();
        deleteAudio = jest.fn();
        setAudioFilter = jest.fn();

        wrapper = mount(<AudioListWrapped
            audioList={audioList}
            selectedAudioId="1"
            isPlaying={false}
            filter={AudioLibraryFilter.ALL}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            updateAudio={updateAudio}
            deleteAudio={deleteAudio}
            setAudioFilter={setAudioFilter}
        />);
        component = wrapper.find(AudioList);
    });

    it("renders successfully", () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find(ToggleButton).length).toBe(2);
        expect(wrapper.find(AudioCard).length).toBe(2);
    });

    it('renders a message when there is no audio in the list', () => {
        wrapper = mount(<AudioListWrapped
            audioList={[]}
            selectedAudioId="1"
            isPlaying={false}
            filter={AudioLibraryFilter.ALL}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            updateAudio={updateAudio}
            deleteAudio={deleteAudio}
            setAudioFilter={setAudioFilter}
        />);
        expect(wrapper.find(AudioCard).length).toBe(0);
        expect(wrapper.find('Typography[data-test="no-audio-title"]').text()).toBe("Looks like you need to upload some audiobooks!");
    });

    it('changes the filter to "FAVORITE"', () => {
        wrapper.find(FavoriteIcon).simulate('click');
        expect(setAudioFilter).toHaveBeenCalledWith(AudioLibraryFilter.FAVORITE);
    });

    it('changes the filter to "COMPLETE" on click', () => {
        wrapper.find(CheckIcon).simulate('click');
        expect(setAudioFilter).toHaveBeenCalledWith(AudioLibraryFilter.COMPLETE);
    });
});