import { UserService } from './user';

describe("UserService", () => {

    const user = { email: 'test@test.com' };

    describe("#addUser", () => {
        it("inserts a user into the users collection when user doesn't exist", async () => {
            const setFn = jest.fn();
            const documentId = '12345';
            const collectionRef = {
                doc: jest.fn(() => ({
                    id: documentId,
                    set: setFn
                }))
            };

            const userService = new UserService(collectionRef);
            const existsSpy = jest.spyOn(userService, 'userExists').mockImplementation(() => Promise.resolve(false));
            const document = await userService.addUser(user);
            expect(document.id).toEqual(documentId);
            expect(existsSpy).toHaveBeenCalledWith(user.email);
            expect(collectionRef.doc).toHaveBeenCalledWith(user.email);
            expect(setFn).toHaveBeenCalledWith(user);
        });

        it('throws an error when the user already exists', async () => {
            const collectionRef = {};
            const userService = new UserService(collectionRef);
            const existsSpy = jest.spyOn(userService, 'userExists').mockImplementation(() => Promise.resolve(true));
            await expect(userService.addUser(user)).rejects.toThrow(`User ${user.email} already exists!`);
            expect(existsSpy).toHaveBeenCalledWith(user.email);
        });
    });

    describe("#getUser", () => {
        it("returns the requested user", async () => {
            const expectedUser = { email: 'test@test.com', id: 1 };
            const dataFn = jest.fn(() => expectedUser);
            const getFn = jest.fn(() => ({ data: dataFn }));
            const collectionRef = {
                doc: jest.fn(() => ({
                    get: getFn
                }))
            };
            const userService = new UserService(collectionRef);
            const actualUser = await userService.getUser(expectedUser.email);
            expect(actualUser).toEqual(expectedUser);
            expect(collectionRef.doc).toHaveBeenCalledWith(expectedUser.email);
            expect(getFn).toHaveBeenCalled();
            expect(dataFn).toHaveBeenCalled();
        });
    });

    describe("#updateUser", () => {
        it("updates a user in the users collection", async () => {
            const updateFn = jest.fn();
            const collectionRef = {
                doc: jest.fn(() => ({
                    update: updateFn
                }))
            };
            const userService = new UserService(collectionRef);
            await userService.updateUser(user);
            expect(collectionRef.doc).toBeCalledWith(user.email);
            expect(updateFn).toHaveBeenCalledWith(user);
        });
    });

    describe("#userExists", () => {

        it("returns true if the user exists", async () => {
            const getFn = jest.fn(() => ({ exists: true }));
            const collectionRef = {
                doc: jest.fn(() => ({
                    get: getFn
                }))
            };

            const userService = new UserService(collectionRef);
            const userExists = await userService.userExists(user.email);
            expect(userExists).toBe(true);
            expect(collectionRef.doc).toHaveBeenCalledWith(user.email);
            expect(getFn).toHaveBeenCalled();
        });

        it("returns false if the user doesn't exist", async () => {
            const getFn = jest.fn(() => ({ exists: false }));
            const collectionRef = {
                doc: jest.fn(() => ({
                    get: getFn
                }))
            };

            const userService = new UserService(collectionRef);
            const userExists = await userService.userExists(user.email);
            expect(userExists).toBe(false);
            expect(collectionRef.doc).toHaveBeenCalledWith(user.email);
            expect(getFn).toHaveBeenCalled();
        });
    });

    describe('#getSerializableUser', () => {
        it('returns a user object with a subset of the serializable fields from the firebase.User', () => {
            const fbUser: Partial<firebase.User> = {
                emailVerified: false,
                isAnonymous: false,
                metadata: {
                    creationTime: new Date().getTime().toString(),
                    lastSignInTime: new Date().getTime().toString(),
                },
                phoneNumber: '555-555-5555',
                email: 'test@test.com',
                photoURL: 'https://photo.hub',
                displayName: 'name',
                providerId: 'firebase',
                uid: '123jsdf',
                delete: jest.fn()
            };
            const service = new UserService({});
            const user = service.getSerializableUser(fbUser);
            expect(user.emailVerified).toEqual(fbUser.emailVerified);
            expect(user.isAnonymous).toEqual(fbUser.isAnonymous);
            expect(user.creationTime).toEqual(fbUser.metadata.creationTime);
            expect(user.lastSignInTime).toEqual(fbUser.metadata.lastSignInTime);
            expect(user.phoneNumber).toEqual(fbUser.phoneNumber);
            expect(user.email).toEqual(fbUser.email);
            expect(user.photoURL).toEqual(fbUser.photoURL);
            expect(user.displayName).toEqual(fbUser.displayName);
            expect(user.providerId).toEqual(fbUser.providerId);
            expect(user.uid).toEqual(fbUser.uid);
        });
    });
});