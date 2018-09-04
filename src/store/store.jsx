import { createStore,combineReducers ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {LoginReducer} from '../component/Login/LoginReducer';
import {PanelReducer} from '../component/nav_user_panel/panelReducer';
import {leftMenuReducer} from '../component/leftMenu/leftMenuReducer';
import {rightMenuReducer} from '../component/rightMenu/rightMenuReducer';

import {persistStore, persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
/* import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'; */

const persistConfig = {
    key: 'root',
    storage:storageSession/* ,
    stateReconciler:autoMergeLevel1 */
};

let reducer=combineReducers({
   Login:LoginReducer,
   panel:PanelReducer,
   leftMenu:leftMenuReducer,
   rightMenu:rightMenuReducer
});

let perReducer=persistReducer(persistConfig,reducer);
export let store = createStore(perReducer,applyMiddleware(thunk));
/* export let store = createStore(perReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunk)); */
export let persistor = persistStore(store);
/* const store=createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export default store; */
/* export default () => {
    let store = createStore(perReducer,applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
} */