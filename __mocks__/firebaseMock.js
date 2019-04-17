
module.exports = {
    auth: () => console.log('auth()'),//{

        // return {
        //     currentUser: {email: 'test@test.com'},
        //     signOut: jest.fn(() => {
        //         return Promise.resolve('signOut() complete');
        //     }),
        //     onAuthStateChanged: jest.fn(() => {
        //         return Promise.resolve({email: 'test@test.com'})
        //     }),
        //     signInWithEmailAndPassword: jest.fn((email, password) => {
        //         return Promise.resolve('signInWithEmailAndPassword() complete');
        //     })
        // }
   // },
    firestore: () => ({
        collection: () => console.log('firestore().collection()')
    }),
    
    storage: () => ({
        ref: () => console.log('storage().ref()')
    }),
    functions: () => ({
        httpsCallable: console.log('functions().httpsCallable()')
    })
};
