import * as React from 'react';
import WrappedAddAudio, { AddAudio } from './index';
import { mount, ReactWrapper } from 'enzyme';
import Button from "@material-ui/core/Button/Button";


describe('<AddAudio/>', () => {
    // let wrapper: ReactWrapper;

    // beforeEach(() => {
    //     wrapper = mount(<WrappedAddAudio/>);
    // });

    // it('renders successfully', () => {
    //     expect(wrapper.exists()).toBe(true);
    // });

    // it('has the necessary inputs for adding audio', () => {
    //     const wrapperInstance = wrapper.find(AddAudio).instance() as AddAudio;

    //     // const titleField = wrapper.find('input#title-field').first();
    //     // titleField.simulate('change', {target: {value: 'Test', name: 'title'}});
    //     // expect(wrapperInstance.state.audio.title).toBe('Test');

    //     // const authorField = wrapper.find('input#author-field').first();
    //     // authorField.simulate('change', {target: {name: 'author', value: 'Test Author'}});
    //     // expect(wrapperInstance.state.audio.author).toBe('Test Author');

    //     const fileInput = wrapper.find('input[type="file"]').first();
    //     expect(fileInput.exists()).toBe(true);

    //     const uploadLabel = wrapper.find('label');
    //     expect(uploadLabel.exists()).toBe(true);

    //     expect(uploadLabel.find(Button).exists()).toBe(true);
    // });
});
