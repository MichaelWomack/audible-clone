import * as React from 'react';
import ProtectedRoute from './index';
import { Home } from '../Home';
import { MemoryRouter, Route, Redirect } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';

/** TODO figure out how to unmock the firebase module so it can be remocked differently */
describe('<ProtectedRoute />', () => {
    let wrapper: ReactWrapper;
    const component: React.ComponentClass = Home;
    beforeEach(() => {
    });
    
    // it('renders the routed component successfully', () => {
    //     wrapper = mount(
    //         <MemoryRouter initialEntries={['/fake-path']}>
    //             <ProtectedRoute component={component} path={'/home'} />
    //         </MemoryRouter>,
    //     );
    //     expect(wrapper).toBeTruthy();
    //     expect(wrapper.find(Route).length).toBe(1);
    // });
    
    // it('renders redirect when not logged in', () => {
    //     jest.mock('../../config/firebase', () => {
    //         return {
    //             auth: () => {
    //                 return {}
    //             }
    //         };
    //     });
    //     wrapper = mount(
    //         <MemoryRouter initialEntries={['/fake-path']}>
    //             <ProtectedRoute component={component} path={'/home'} />
    //         </MemoryRouter>
    //     );
    //     expect(wrapper).toBeTruthy();
    //     expect(wrapper.find(Redirect).length).toBe(1);
    // });
});

                                    