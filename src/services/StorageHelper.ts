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
            .put(file);
    }

    getAudioStoragePath(userId: string, audioId: string): string {
        return `users/${userId}/uploads/${audioId}`;
    }
}

const reference: storage.Reference = firebaseInstance.storage().ref();
export const storageHelper: StorageHelper = new StorageHelper(reference);
