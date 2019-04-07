import { applyMiddleware, createStore, combineReducers, Reducer } from 'redux';
import { persistStore, persistReducer, PersistConfig, Persistor } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createBlacklistFilter, createWhitelistFilter } from 'redux-persist-transform-filter';
import { loaderMiddleware } from './middleware/loader';
import { snackbarMiddleware } from './middleware/snackbar';
import { notificationMiddleware } from "./middleware/notification";
import { userMiddleware } from "./middleware/user";
import * as reducers from './reducers';


export const configureStore = (preloadedState: any = {}) => {
    const middlewares = [ thunk, loaderMiddleware, snackbarMiddleware, notificationMiddleware, userMiddleware ];
    const rootReducer: Reducer = combineReducers(reducers);

    const audioFilter = createWhitelistFilter('audio', ['library']);
    const playerFilter = createBlacklistFilter('player', ['isPlaying']);
    const uiFilter = createWhitelistFilter('ui', ['themeOptions']);

    const persistConfig: PersistConfig = {
        key: 'root',
        whitelist: ['user', 'audio', 'player', 'ui'],
        storage,
        transforms: [  audioFilter, playerFilter, uiFilter ]
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
