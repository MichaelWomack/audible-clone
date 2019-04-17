import firebaseInstance from '../config/firebase';
import { storage } from 'firebase';

export class StorageHelper {

    constructor(private readonly reference: Partial<storage.Reference>) {
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

    deleteBlob(path: string): Promise<void> {
        return this.reference
            .child(path)
            .delete();
    }
}

const reference = firebaseInstance.storage().ref();
export const storageHelper = new StorageHelper(reference);
