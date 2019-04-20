import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import App from './index';
import Root from '../Root';
import NavBar from "../NavBar";
import Banner from '../Banner';
import { Route } from "react-router-dom";

describe('<App />', () => {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(
            <Root>
                <App/>
            </Root>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders successfully', () => {
        console.log(wrapper.debug());
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find(NavBar).length).toBe(1);
        expect(wrapper.find(Banner).length).toBe(1);
        expect(wrapper.find(Route).length).toBe(3);
    });
});

