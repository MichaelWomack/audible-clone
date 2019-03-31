import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import Settings from './index';
import Typography from "@material-ui/core/Typography/Typography";
import ValidationTextField from "../ValidationTextField";
import Button from "@material-ui/core/Button";

describe("Settings", () => {
    const mount = createMount();
    let wrapper: ReactWrapper;
    let changePassword;
    let toggleTheme;
    beforeEach(() => {
        changePassword = jest.fn();
        toggleTheme = jest.fn();
        wrapper = mount(
            <Settings toggleTheme={toggleTheme} changePassword={changePassword} />
        );
    });

    it("renders successfully", () => {
        expect(wrapper.exists()).toBe(true);

        const headingElement = wrapper.find(Typography).at(0);
        expect(headingElement.text()).toBe("Settings");

        const passwordFields = wrapper.find(ValidationTextField);
        expect(passwordFields.length).toBe(2);

        const changePasswordButton = wrapper.find(Button);
        expect(changePasswordButton.exists()).toBe(true);
        expect(changePasswordButton.text()).toBe('change password');
    });

    it('changes the theme when the theme toggle is clicked', () => {

    });
});