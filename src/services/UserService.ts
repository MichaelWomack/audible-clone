import { firestore } from 'firebase';
import firebaseInstance from "../config/firebase";
import { Collection } from "../config/constants";
import { SerializableUser } from "../model/user";

export class UserService {

    constructor(private readonly collection: firestore.CollectionReference | any) {
        this.collection = collection;
    }

    async userExists(email: string): Promise<boolean> {
         const document = await this.collection.doc(email).get();
         return document.exists;
    }

    async getUser(email: string): Promise<SerializableUser> {
        console.log(`getting ${email}`);
        const document = await this.collection.doc(email).get();
        return document.data();
    }

    async addUser(user: SerializableUser): Promise<firestore.DocumentReference> {
        return await this.collection.add(user);
    }

    async updateUser(user: SerializableUser): Promise<void> {
        console.log('updating user with ', user);
        await this.collection
            .doc(user.email)
            .update(user);
    }

    getSerializableUser(user: firebase.User): SerializableUser {
        return {
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            phoneNumber: user.phoneNumber,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
            providerId: user.providerId,
            uid: user.uid
        };
    }
}

const collection = firebaseInstance.firestore().collection(Collection.USERS);
export const userService = new UserService(collection);