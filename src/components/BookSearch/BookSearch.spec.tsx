import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import BookSearchWrapped, { BookSearch, BookSearchProps, BookSearchState } from './BookSearch';
import BookDetail from './BookDetail';
import { VolumeInfo } from "../../model/volume";

describe("<BookSearch />", () => {

    let wrapper: ReactWrapper<BookSearchProps, BookSearchState>;
    let component: ReactWrapper<BookSearchProps, BookSearchState>;

    let setNextStepDisabled: () => void;
    let goToNextStep: () => void;
    let searchBooks: (query: string) => void;
    let selectVolume: (volume: VolumeInfo) => void;

    let volumes: VolumeInfo[] = [
        { id: '1' }
    ];

    beforeEach(() => {
        setNextStepDisabled = jest.fn();
        searchBooks = jest.fn();
        selectVolume = jest.fn();
        goToNextStep = jest.fn();

        wrapper = mount(
            <BookSearchWrapped
                volumes={volumes}
                selectVolume={selectVolume}
                setNextStepDisabled={setNextStepDisabled}
                goToNextStep={goToNextStep}
                searchBooks={searchBooks}
            />
        );
        component = wrapper.find(BookSearch);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders successfully', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders a BookDetail component per volume', () => {
        expect(wrapper.find(BookDetail).length).toBe(volumes.length);
    });

    it('performs a book search when a query is provided', () => {
        const query = 'A Game of Thrones';
        wrapper.find('input[id="query-text-field"]').simulate('change', {
            target: {
                name: 'searchQuery',
                value: query
            }
        });
        expect(component.state().searchQuery).toEqual(query);
        wrapper.find(`IconButton[data-test="search-button"]`).simulate('click');
        expect(searchBooks).toHaveBeenCalledWith(query);
    });

    it("doesn't call searchBooks() prop when the query string is empty", () => {
        let spy = jest.spyOn(component.instance() as BookSearch, 'searchBooks');
        wrapper.setState({}); /** force update so it is bound to the spy instead of the original function */
        expect(wrapper.find('input[id="query-text-field"]').props().value).toBe("");
        component.find(`IconButton[data-test="search-button"]`).at(0).simulate('click');
        expect(spy).toHaveBeenCalled();
        expect(searchBooks).not.toHaveBeenCalled();
    });

    it("successfully selects the appropriate volume when BookDetail is selected", () => {
        expect(wrapper.find(BookDetail).length).toBe(1);
        wrapper.find(`Button[data-test="select-volume-button"]`).at(0).simulate('click');
        expect(selectVolume).toHaveBeenCalledWith(volumes[0]);
    });
});
