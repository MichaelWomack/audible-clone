import 'jest-enzyme';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
const firebaseMock = require( '../__mocks__/firebaseMock');

jest.mock('./config/firebase', () => {
    return { //default is needed because typescript handles default exports differently than es6
        default: firebaseMock
     };
});
Enzyme.configure({ adapter: new Adapter() });