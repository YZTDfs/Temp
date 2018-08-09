import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {store,persistor} from './store/store';
import './index.css';
import Routers from './routers/router';
import { PersistGate } from 'redux-persist/integration/react'
import registerServiceWorker from './registerServiceWorker';



render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routers />
      </PersistGate>
    </Provider>,document.getElementById('oss_system_main')
);

registerServiceWorker();
