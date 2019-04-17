import { BookSearchService } from "./BookSearchService";

describe('BookSearchService', () => {

    it('invokes the searchBook firebase function', async () => {
        const searchBookMock = jest.fn((query: string) => {});
        const functions = {
            httpsCallable: jest.fn(() => searchBookMock)
        };
        const service = new BookSearchService(functions);
        await service.searchBookInfo("query");
        expect(functions.httpsCallable).toHaveBeenCalledWith('searchBook');
        expect(searchBookMock).toHaveBeenCalledWith({q: "query"});
    });
});