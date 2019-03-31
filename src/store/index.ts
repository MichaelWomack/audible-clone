import { applyMiddleware, createStore, combineReducers, Reducer } from 'redux';
import { persistStore, persistReducer, PersistConfig, Persistor } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { loaderMiddleware } from './middleware/loader';
import { snackbarMiddleware } from './middleware/snackbar';
import { notificationMiddleware } from "./middleware/notification";
import * as reducers from './reducers';


export const configureStore = (preloadedState: any = {}) => {
    const middlewares = [ thunk, loaderMiddleware, snackbarMiddleware, notificationMiddleware ];
    const rootReducer: Reducer = combineReducers(reducers);

    const audioPlayerFilter = createBlacklistFilter('player', ['isPlaying']);

    const persistConfig: PersistConfig = {
        key: 'root',
        whitelist: ['user', 'audio', 'player'],
        storage,
        transforms: [ audioPlayerFilter ]
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = createStore(
        persistedReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    const persistor: Persistor = persistStore(store);
    return { store, persistor };
};
