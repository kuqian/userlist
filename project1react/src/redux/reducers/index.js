import {combineReducers} from "redux";
import createReducer from './createReducer';
import usersReducer from './usersReducer';
const reducers = combineReducers({
    createReducer,
    usersReducer
});
export default reducers;