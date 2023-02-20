import { createStore, combineReducers } from 'redux'
import user from './reducers/LoginReducer'

const rootReducers = combineReducers(
    {
        user: user,
    }
);
const store = createStore(rootReducers)

export default store;