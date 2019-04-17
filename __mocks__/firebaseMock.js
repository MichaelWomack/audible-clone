
module.exports = {
    auth: () =>  console.log('auth()'),
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
