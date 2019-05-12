import firebaseInstance from '../config/firebase';
import { functions } from 'firebase';

export class BookSearchService {

    constructor(private readonly functions: functions.Functions | any) {
        this.functions = functions;
    }

    searchBookInfo = (searchQuery: string): Promise<functions.HttpsCallableResult> => {
        const params = { q: searchQuery };
        const searchBook = this.functions.httpsCallable('searchBook');
        return searchBook(params);
    }
}

const funcs = firebaseInstance.functions();
export const booksSearch = new BookSearchService(funcs);