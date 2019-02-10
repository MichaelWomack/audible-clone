import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import WrappedLogin, { Login, LoginProps, LoginState } from './index';

describe('<Login />', () => {
    let wrapper: ReactWrapper;
    // beforeEach(() => {
    //     wrapper = mount(
    //         <MemoryRouter>
    //             <WrappedLogin user={null}/>
    //         </MemoryRouter>,
    //     );
    // });

    // it('should render successfully', () => {
    //     expect(wrapper).toBeTruthy();
    // });

    // it('should call login() successfully', () => {
    //     const login = wrapper.find(Login);
    //     const emailInput = login.find('input[id="email"]');
    //     const passwordInput = login.find('input[id="password"]');
        
    //     expect(emailInput.length).toBe(1);
    //     expect(passwordInput.length).toBe(1);

    //     emailInput.simulate('change', {
    //         target: { value: 'test@test.com', id: 'email' },
    //     });
    //     passwordInput.simulate('change', {
    //         target: { value: 'test', id: 'password' },
    //     });
    //     const instance = login.instance() as Login;
    //     instance.login();
    // });
});
