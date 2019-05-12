import * as React from 'react';
import { MemoryRouter } from "react-router-dom";
import { mount, ReactWrapper } from 'enzyme';
import LoginWrapped, { Login, LoginProps, LoginState } from './Login';
import { BannerType } from "../../config/constants";
import { UiState } from "../../model/state";


describe('<Login />', () => {
    let wrapper: ReactWrapper<LoginProps, LoginState, Login>;
    let component: ReactWrapper<LoginProps, LoginState>;

    let login: jest.Mock<(email: string, password: string, callback: Function) => void>;
    let loginWithAuthProvider: jest.Mock<(provider: firebase.auth.AuthProvider, callback: Function) => void>;
    let ui: UiState;

    beforeEach(() => {
        login = jest.fn();
        loginWithAuthProvider = jest.fn();
        ui = {
            isLoading: false,
            snackbarMessage: '',
            snackbarOpen: false,
            themeOptions: null,
            error: null,
            bannerOpen: false,
            bannerType: BannerType.INFO,
            bannerMessage: ''
        };

        wrapper = mount(
                <MemoryRouter>
                    <LoginWrapped
                        login={login}
                        loginWithAuthProvider={loginWithAuthProvider}
                        ui={ui}
                    />
                </MemoryRouter>
        );
        component = wrapper.find(Login);
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('completes basic email/password login successfully', () => {
        const emailInput = wrapper.find('input[id="email"]');
        expect(emailInput.length).toBe(1);

        const passwordInput = wrapper.find('input[id="password"]');
        expect(passwordInput.length).toBe(1);

        const email = 'test@test.com';
        const password = 'test';
        emailInput.simulate('change', { target: { value: email, id: 'email' } });
        passwordInput.simulate('change', { target: { value: password, id: 'password' } });
        wrapper.find(`Button[data-test="login-button"]`).simulate('click');

        expect(login).toHaveBeenCalled();
        expect(login.mock.calls[0][0]).toEqual(email);
        expect(login.mock.calls[0][1]).toEqual(password);
    });

    it('calls Google auth provider login successfully', () => {
        wrapper.find(`IconButton[data-test="login-with-google"]`).simulate('click');
        expect(loginWithAuthProvider).toHaveBeenCalled();
    });

    it('calls Facebook auth provider login successfully', () => {
        wrapper.find(`IconButton[data-test="login-with-facebook"]`).simulate('click');
        expect(loginWithAuthProvider).toHaveBeenCalled();
    });

    it('calls Twitter auth provider login successfully', () => {
        wrapper.find(`IconButton[data-test="login-with-twitter"]`).simulate('click');
        expect(loginWithAuthProvider).toHaveBeenCalled();
    });
});
