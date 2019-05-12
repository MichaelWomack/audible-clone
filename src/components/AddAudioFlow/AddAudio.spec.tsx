import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from "react-router-dom";
import WrappedAddAudioFlow, { AddAudio, AddAudioProps, AddAudioState } from './AddAudioFlow';
import { VolumeInfo } from "../../model/volume";
import Root from "../Root";
import { ReduxState } from "../../model/state";
import { BookSearch } from "../BookSearch/BookSearch";
import { EditDetails } from "../EditDetails";
import { UploadAudio } from "../UploadAudio";

describe('<AddAudioFlow/>', () => {

    let wrapper: ReactWrapper<AddAudioProps, AddAudioState, AddAudio>;
    let component: ReactWrapper<AddAudioProps, AddAudioState>;
    let instance: AddAudio;

    let clearVolumes: () => void;
    let setVolume: (volume: VolumeInfo) => void;
    let clearUploadStatus: () => void;
    let isUploading: boolean;
    let uploadComplete: boolean;
    let uploadProgress: number;

    let current: HTMLDivElement;

    let selectedVolume = {
        id: '1',
        title: 'A Game of Thrones',
        subtitle: 'A Song of Ice and Fire',
        authors: ['George R.R. Martin'],
        description: 'Book 1'
    };

    beforeEach(() => {
        clearVolumes = jest.fn();
        setVolume = jest.fn();
        clearUploadStatus = jest.fn();
        isUploading = true;
        uploadComplete = false;
        uploadProgress = 0;

        const initialState: Partial<ReduxState> = {
            volumes: {
                volumes: [],
                selectedVolume
            }
        };

        wrapper = mount(
            <Root initialState={initialState}>
                <MemoryRouter>
                    <WrappedAddAudioFlow
                        clearVolumes={clearVolumes}
                        setVolume={setVolume}
                        clearUploadStatus={clearUploadStatus}
                        isUploading={isUploading}
                        uploadComplete={uploadComplete}
                        uploadProgress={uploadProgress}
                    />
                </MemoryRouter>
            </Root>
        );
        component = wrapper.find(AddAudio);
        instance = component.instance() as AddAudio;

        current = document.createElement('div');
        current.scrollIntoView = jest.fn();
        instance.scrollRef = { current };
    });

    afterEach(() => {
        wrapper.unmount();
        jest.restoreAllMocks();
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
        expect(component.exists()).toBe(true);
    });

    it('renders the correct components for each active step', () => {
        expect(instance.state.activeStep).toBe(0);
        expect(wrapper.find(BookSearch).exists()).toBe(true);
        expect(wrapper.find(EditDetails).exists()).toBe(false);
        expect(wrapper.find(UploadAudio).exists()).toBe(false);

        instance.setState({ activeStep: 1 });
        wrapper.update();
        expect(wrapper.find(EditDetails).exists()).toBe(true);
        expect(wrapper.find(BookSearch).exists()).toBe(false);
        expect(wrapper.find(UploadAudio).exists()).toBe(false);

        instance.setState( {activeStep: 2 });
        wrapper.update();
        expect(wrapper.find(UploadAudio).exists()).toBe(true);
        expect(wrapper.find(BookSearch).exists()).toBe(false);
        expect(wrapper.find(EditDetails).exists()).toBe(false);
    });

    describe('#scrollIntoView', () => {
        it('calls scrollIntoView on the refObject current', () => {
            const current = document.createElement('div');
            current.scrollIntoView = jest.fn();
            instance.scrollRef = { current };
            instance.scrollIntoView();
            expect(instance.scrollRef.current.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
        });
    });

    describe('#nextStep', () => {
        it('increments the active step', () => {
            instance.scrollIntoView = jest.fn();
            instance.setState({ activeStep: 0 });
            expect(instance.state.activeStep).toBe(0);
            instance.nextStep();
            expect(instance.state.activeStep).toBe(1);
        });
    });

    describe('#previousStep', () => {
        it('decrements the active step', () => {
            instance.setState({ activeStep: 1 });
            expect(instance.state.activeStep).toBe(1);
            instance.previousStep();
            expect(instance.state.activeStep).toBe(0);
        });
    });

    describe('#setNextStepDisabled', () => {
        it('sets the state to the passed boolean value', () => {
            expect(instance.state.nextStepDisabled).toBe(true);
            instance.setNextStepDisabled(false);
            expect(instance.state.nextStepDisabled).toBe(false);
        });
    });
});
