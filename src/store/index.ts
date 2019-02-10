import { applyMiddleware, createStore, combineReducers, Reducer } from 'redux';
import { persistStore, persistReducer, PersistConfig, Persistor } from 'redux-persist';
import thunk from 'redux-thunk';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage/session'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducers from './reducers';
import { loaderMiddleware } from './middleware/loader';
 
export const configureStore = (preloadedState: any = {}) => {
    const middlewares = [ thunk, loaderMiddleware ];
    const rootReducer: Reducer = combineReducers(reducers);

    const persistConfig: PersistConfig = {
        key: 'root',
        whitelist: ['user'],
        storage
    };
    
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = createStore(
        persistedReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    const persistor: Persistor = persistStore(store);
    return { store, persistor };
}
