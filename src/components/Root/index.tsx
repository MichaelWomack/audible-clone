import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '../../store/index';
import { FunctionComponent } from "react";
import { ReduxState } from "../../model/state";
import { DeepPartial } from "redux";

export interface RootProps {
    initialState?: DeepPartial<ReduxState>
    persist?: boolean;
}

const Root: FunctionComponent<RootProps> = ({ initialState, persist, children }) => {
    const { store, persistor } = configureStore(initialState);
    const loadingElement = <h1>Loading!!!</h1>;
    return (
        <Provider store={store}>
            {persist ?
                <PersistGate loading={loadingElement} persistor={persistor}>
                    {children}
                </PersistGate> : children
            }
        </Provider>
    );
};

Root.defaultProps = {
    persist: false
};

export default Root;