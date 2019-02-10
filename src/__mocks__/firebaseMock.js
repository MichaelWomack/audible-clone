module.exports = {
   default: {  //this is needed because typescript handles default exports differently than es6
        auth: () => {
            return {
                currentUser: {email: 'test@test.com'},
                signOut: jest.fn(() => {
                    return Promise.resolve('signOut() complete');
                }),
                onAuthStateChanged: jest.fn(() => {
                    return Promise.resolve({email: 'test@test.com'})
                }),
                signInWithEmailAndPassword: jest.fn((email, password) => {
                    return Promise.resolve('signInWithEmailAndPassword() complete');
                })
            }
        }
    }
};
