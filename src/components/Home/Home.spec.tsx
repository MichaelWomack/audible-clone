import * as React from 'react';
import HomeWrapped, {HomeProps, Home} from './Home';
import { MemoryRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';

describe('<Home />', () => {
    let wrapper: ReactWrapper;

    // beforeEach(() => {
    //     wrapper = mount(
    //         <MemoryRouter>
    //             <HomeWrapped />
    //         </MemoryRouter>
    //     );
    // });

    it('should render', () => {
       // expect(wrapper).toBeTruthy();
    });

    // it('should call signOut() successfully', () => {
    //     const home = wrapper.find(Home).instance() as Home;
    //     console.log(home.state);
    //     home.signOut();
    // });
});
