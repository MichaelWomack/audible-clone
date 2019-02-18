import firebaseInstance from '../config/firebase';
import { storage } from 'firebase';

export class StorageHelper {

    private reference: storage.Reference;

    constructor(reference: storage.Reference | any) {
        this.reference = reference;
    }

    getUploadTask(storagePath: string, file: File): storage.UploadTask {
        return this.reference
            .child(storagePath)
            .child(file.name)
            .put(file);
    }

    getAudioStoragePath(userId: string, audioId: string): string {
        return `users/${userId}/uploads/${audioId}`;
    }

    blobExists(path: string): boolean {
        return this.reference.child(path) !== null;
    }

    deleteBlob(path: string): Promise<void> {
        return this.reference
            .child(path)
            .delete();
    }
}

const reference: storage.Reference = firebaseInstance.storage().ref();
export const storageHelper: StorageHelper = new StorageHelper(reference);
