import { firestore } from 'firebase';
import firebaseInstance from "../config/firebase";
import { Collection } from "../config/constants";
import { SerializableUser } from "../model/user";

export class UserService {

    constructor(private readonly collection: Partial<firestore.CollectionReference>) {
        this.collection = collection;
    }

    async userExists(email: string): Promise<boolean> {
         const document = await this.collection.doc(email).get();
         return document.exists;
    }

    async getUser(email: string): Promise<SerializableUser> {
        const document = await this.collection.doc(email).get();
        return document.data() as SerializableUser;
    }

    async addUser(user: SerializableUser): Promise<firestore.DocumentReference> {
        if (await this.userExists(user.email)) throw new Error(`User ${user.email} already exists!`);
        const document = this.collection.doc(user.email);
        await document.set(user);
        return document;
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