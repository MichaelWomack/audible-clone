import { StorageHelper } from './storage';

describe('StorageHelper', () => {

    it('is successfully instantiated', () => {
        const storageReference = {};
        const storageHelper = new StorageHelper(storageReference);
        expect(storageHelper).toBeTruthy();
    });

    describe('#getAudioStoragePath', () => {
        it( 'builds the correct storage path', () => {
            const helper = new StorageHelper({});
            const userId = 'abc123';
            const audioId = 'xyz456';
            expect(helper.getAudioStoragePath(userId, audioId)).toBe(`users/${userId}/uploads/${audioId}`);
        });
    });

    describe("#deleteBlob", () => {
        it('calls delete() on the blob object with the specified path', async () => {
            const deleteFn = jest.fn();
            const storageReference = {
                child: jest.fn(() => ({
                    delete: deleteFn
                }))
            };
            const helper = new StorageHelper(storageReference);
            const path = "/blob/here";
            await helper.deleteBlob(path);
            expect(storageReference.child).toHaveBeenCalledWith(path);
            expect(deleteFn).toHaveBeenCalled();
        });
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