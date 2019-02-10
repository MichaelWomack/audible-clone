import * as React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import AudioCard from './index';
import { Audio } from '../../model/audio';


describe('AudioCard', () => {

    let wrapper: ShallowWrapper;
    let mockToggleFavorite;
     
    // beforeEach(() => {
    //     const audio: Audio = {
    //         title: 'A Game of Thrones',
    //         author: 'George R.R. Martin'
    //     }
    //     mockToggleFavorite = jest.fn();
    //     wrapper = shallow(<AudioCard 
    //             audio={audio} 
    //             updateAudio={jest.fn()}
    //         />
    //     );
    // });

    // it('renders sucessfully', () => {
    //     expect(wrapper.exists()).toBe(true);
    // });


});