import firebaseInstance from '../config/firebase';
import { firestore } from 'firebase';
import { Audio } from '../model/audio';
import { Collection } from '../config/constants';

export class AudioService {

    constructor(private readonly collection: firestore.CollectionReference | any) {
        this.collection = collection;
    }
    
    async getAll(userId: string): Promise<firestore.QuerySnapshot> {
        const query: firestore.Query = this.collection
            .where('userId', '==', userId);
        return await query.get();
    }

    async getAudio(id: string): Promise<firestore.DocumentReference> {
        return await this.collection.doc(id);
    }

    async addAudio(audio: Audio): Promise<firestore.DocumentReference> {
        return await this.collection.add(audio);
    };

    async updateAudio(audio: Audio): Promise<void> {
        audio.lastUpdated = new Date().getTime();
        await this.collection
            .doc(audio.id)
            .update(audio);
    };

    async deleteAudio(audio: Audio): Promise<void> {
        await this.collection
            .doc(audio.id)
            .delete();
    };
}

const audioCollection = firebaseInstance
    .firestore()
    .collection(Collection.AUDIO);

export const audioService: AudioService = new AudioService(audioCollection);