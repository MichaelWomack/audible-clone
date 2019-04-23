import { auth } from 'firebase';
import firebaseInstance from '../config/firebase';


export class AuthService {

    constructor(private readonly auth: Partial<auth.Auth>) {
        this.auth = auth;
    }

    getAuth() {
        return this.auth;
    }

    async createUserWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential> {
        return await this.auth.createUserWithEmailAndPassword(email, password);
    }

    async login(email: string, password: string): Promise<auth.UserCredential> {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async loginWithProvider(authProvider: auth.AuthProvider): Promise<auth.UserCredential> {
        return await this.auth.signInWithPopup(authProvider);
    }

    async logOut() {
        await this.auth.signOut();
    }
}

const authReference: auth.Auth = firebaseInstance.auth();
export const authService: AuthService = new AuthService(authReference);