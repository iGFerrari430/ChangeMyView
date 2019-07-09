//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
import authReducer from "../reducers/authReducer" 
import { createStore,combineReducers } from "redux";

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer
        })
    );

    return store;
}
