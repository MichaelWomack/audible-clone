// import * as reducers from './reducers';
// import { applyMiddleware, createStore, combineReducers, Reducer } from 'redux';
// import { persistStore, persistReducer, PersistConfig, Persistor } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
// import storage from 'redux-persist/lib/storage/session'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk';
 

// export const configureStore = (preloadedState: any = {}) => {
//     const middlewares = [ thunk ];
//     const rootReducer: Reducer = combineReducers(reducers);

//     const persistConfig: PersistConfig = {
//         key: 'root',
//         whitelist: ['audio', 'user'],
//         storage
//     };
    
//     const persistedReducer = persistReducer(persistConfig, rootReducer);

//     const store = createStore(
//         persistedReducer,
//         preloadedState,
//         composeWithDevTools(applyMiddleware(...middlewares))
//     );
//     const persistor: Persistor = persistStore(store);
//     return { store, persistor };
// }
