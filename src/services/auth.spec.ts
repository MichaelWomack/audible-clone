import { AuthService } from './auth';
import { auth } from "firebase";

describe('AuthService', () => {

    it('#createUserWithEmailAndPassword',  async () => {
        const auth = {
            createUserWithEmailAndPassword: jest.fn()
        };
        const service = new AuthService(auth);
        const email = "test@test.com";
        const password = "pass";
        await service.createUserWithEmailAndPassword(email, password);
        expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    });

    it('#login', async () => {
        const auth = {
            signInWithEmailAndPassword: jest.fn()
        };
        const service = new AuthService(auth);
        const email = "test@test.com";
        const password = "pass";
        await service.login(email, password);
        expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    });

    it("#loginWithProvider", async () => {
        const auth = {
            signInWithPopup: jest.fn()
        };
        const service = new AuthService(auth);
        const provider: auth.AuthProvider = null;
        await service.loginWithProvider(provider);
        expect(auth.signInWithPopup).toHaveBeenCalledWith(provider);
    });

    it("#logOut", async () => {
        const auth = {
            signOut: jest.fn()
        };
        const service = new AuthService(auth);
        await service.logOut();
        expect(auth.signOut).toHaveBeenCalledTimes(1);
    });

    it("#getAuth", () => {
        const auth = {};
        const service = new AuthService(auth);
        const received = service.getAuth();
        expect(received).toBe(auth);
    });
});