import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../../store/index';
import { PersistGate } from 'redux-persist/integration/react';
import App from '../../containers/App';

const { store, persistor } = configureStore();

export default () => {
    const loadingElement = <h1>Loading!!!</h1>;
    return (
        <Provider store={store}>
            <PersistGate loading={loadingElement} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
}