import { StorageHelper } from './StorageHelper';

describe('StorageHelper', () => {

    it('is successfully instantiated', () => {
        const storageReference = {};
        const storageHelper = new StorageHelper(storageReference);
        expect(storageHelper).toBeTruthy();
    });

    describe('#getUploadTask', () => {
        let storageHelper: StorageHelper;
        let storageReference: any;
        let mockPut: any;
        beforeEach(() => {
            mockPut = jest.fn((file: File) => ({}));
            storageReference = {
                child: jest.fn((storagePath: string) => ({
                    child: jest.fn((storagePath: string) => ({
                        put: mockPut
                    }))
                }))
            };
            storageHelper = new StorageHelper(storageReference);
        });

        it('creates a storage uploadTask given a storage path and file', () => {
            const file: File = new File([], 'fake.txt');
            const storagePath: string = 'storage/path.txt';
            const uploadTask = storageHelper.getUploadTask(storagePath, file);
            expect(storageReference.child).toHaveBeenCalledWith(storagePath);
            expect(uploadTask).toEqual({});
        });
    });
});