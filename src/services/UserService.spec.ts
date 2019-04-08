import { UserService } from './UserService';

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
            const existsSpy = jest.spyOn(userService, 'userExists').mockImplementation(() => false);
            const document = await userService.addUser(user);
            expect(document.id).toEqual(documentId);
            expect(existsSpy).toHaveBeenCalledWith(user.email);
            expect(collectionRef.doc).toHaveBeenCalledWith(user.email);
            expect(setFn).toHaveBeenCalledWith(user);
        });

        it('throws an error when the user already exists', async () => {
            const collectionRef = {};
            const userService = new UserService(collectionRef);
            const existsSpy = jest.spyOn(userService, 'userExists').mockImplementation(() => true);
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
});