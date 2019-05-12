import * as React from 'react';
import { MemoryRouter } from "react-router-dom";
import { mount, ReactWrapper } from 'enzyme';
import SignUpWrapped, { SignUp, SignUpProps, SignUpState } from "./SignUp";
import { auth } from "firebase";

describe('<SignUp/>', () => {

    let wrapper: ReactWrapper<SignUpProps, SignUpState>;
    let component: ReactWrapper<SignUpProps, SignUpState>;
    let instance: SignUp;
    let signUpMock: jest.Mock;
    let signUpWithAuthProviderMock: jest.Mock;

    beforeEach(() => {
        signUpMock = jest.fn();
        signUpWithAuthProviderMock = jest.fn();
        wrapper = mount(
                <MemoryRouter>
                    <SignUpWrapped
                        signUp={signUpMock}
                        signUpWithAuthProvider={signUpWithAuthProviderMock}
                    />
                </MemoryRouter>
        );
        component = wrapper.find(SignUp);
        instance = component.instance() as SignUp;
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
        expect(component.exists()).toBe(true);
    });

    it('initializes with the correct state', () => {
        expect(instance.state.email).toBe('');
        expect(instance.state.password).toBe('');
        expect(instance.state.confirmPassword).toBe('');
        expect(instance.state.emailError).toBe('');
        expect(instance.state.passwordError).toBe('');
        expect(instance.state.confirmPasswordError).toBe('');
    });

    it('signs up with no auth provider', () => {
        const email = "avalidemail@gmail.com", password = "password";
        wrapper.find(`input[id="email"]`).simulate('change', { target: { id: 'email', value: email } });
        wrapper.find(`input[id="password"]`).simulate('change', { target: { id: 'password', value: password } });

        wrapper.update();
        expect(instance.state.email).toBe(email);
        expect(instance.state.password).toBe(password);

        wrapper.find(`Button[data-test="sign-up-button"]`).simulate('click');
        component.setState({});
        expect(signUpMock).toHaveBeenCalled();
        expect(signUpMock.mock.calls[0][0]).toBe(email);
        expect(signUpMock.mock.calls[0][1]).toBe(password);
    });

    it('signs up with a Google auth provider', () => {
        wrapper.find(`IconButton[data-test="sign-up-with-google"]`).simulate('click');
        expect(signUpWithAuthProviderMock).toHaveBeenCalled();
        expect(signUpWithAuthProviderMock.mock.calls[0][0]).toBeInstanceOf(auth.GoogleAuthProvider);
    });

    it('signs up with a Twitter auth provider', () => {
        wrapper.find(`IconButton[data-test="sign-up-with-twitter"]`).simulate('click');
        expect(signUpWithAuthProviderMock).toHaveBeenCalled();
        expect(signUpWithAuthProviderMock.mock.calls[0][0]).toBeInstanceOf(auth.TwitterAuthProvider);
    });

    it('signs up with a Facebook auth provider', () => {
        wrapper.find(`IconButton[data-test="sign-up-with-facebook"]`).simulate('click');
        expect(signUpWithAuthProviderMock).toHaveBeenCalled();
        expect(signUpWithAuthProviderMock.mock.calls[0][0]).toBeInstanceOf(auth.FacebookAuthProvider);
    });
});