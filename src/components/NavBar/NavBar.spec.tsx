import * as React from 'react';
import NavBar from './index';
import {NavBarProps, NavBarState} from './index';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem  from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import { mount, ShallowWrapper, ReactWrapper } from "enzyme";

describe('<NavBar />', () => {

    // let wrapper: ReactWrapper;
    // const mockSignOut = jest.fn();
    // beforeEach(() => {
    //     wrapper = mount(<NavBar signOut={mockSignOut}/>);
    // });

    // it('renders successfully', () => {
    //     expect(wrapper.exists()).toBe(true);
    // });

    // it('opens and closes the account menu', () => {
    //     expect(wrapper.find(Menu).props().open).toBe(false);

    //     const accountIcon = wrapper.find(IconButton).at(1);
    //     expect(accountIcon.exists()).toBe(true);

    //     accountIcon.simulate('click');
    //     expect(wrapper.find(Menu).props().open).toBe(true);

    //     wrapper.find(MenuItem).at(0).simulate('click');
    //     expect(wrapper.find(Menu).props().open).toBe(false);
    // });
});
