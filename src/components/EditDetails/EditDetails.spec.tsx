import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import EditDetailsWrapped, { EditDetails, EditDetailsProps, EditDetailsState } from "./EditDetails";

describe("<EditDetails />", () => {
    let wrapper: ReactWrapper<EditDetailsProps, EditDetailsState, EditDetails>;
    let component: ReactWrapper<EditDetailsProps, EditDetailsState>;
    let props: any;

    beforeEach(() => {
        props = {
            volume: {
                id: '1',
                authors: ['George R.R. Martin'],
                title: 'A Game Of Thrones',
                subtitle: 'Book 1 - A Song of Fire And Ice',
                description: '...'
            },
            setSelectedVolume: jest.fn(),
            setNextStepDisabled: jest.fn()
        };
        wrapper = mount(
            <EditDetailsWrapped {...props} />
        );
        component = wrapper.find(EditDetails);
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find(`TextField[label="title"]`).props().value).toBe(props.volume.title);
        expect(wrapper.find(`TextField[label="subtitle"]`).props().value).toBe(props.volume.subtitle);
        expect(wrapper.find(`TextField[label="author(s)"]`).props().value).toBe(props.volume.authors.join(", "));
        expect(wrapper.find(`TextField[label="description"]`).props().value).toBe(props.volume.description);
    });

    it('updates the selected volume on input change', () => {
        const newTitle = 'A Clash Of Kings';
        wrapper.find(`input[name="title"]`).simulate('change', { target: { name: 'title', value: newTitle }});
        const expectedVolume = { ...props.volume, title: newTitle };
        expect(wrapper.find(`input[name="title"]`).props().value).toBe(newTitle);
        expect(props.setSelectedVolume).toHaveBeenCalledWith(expectedVolume);
    });
});