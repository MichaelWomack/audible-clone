import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './components/Root';
import App from './components/App';

ReactDOM.render(
    <Root persist={true}>
        <App />
    </Root>,
    document.getElementById('root'),
);
