import {persistStore,persistReducer} from 'redux-persist'
import authReducer from "../reducers/authReducer" 
import { createStore,combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,combineReducers({
    auth: authReducer
}))
export default () => {
    let store = createStore(
        persistedReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    let persistor = persistStore(store)
    return {store,persistor};
}
