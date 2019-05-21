import {combineReducers} from "redux";
import createReducer from './createReducer';
import usersReducer from './usersReducer';
import editReducer from './editReducer';
const reducers = combineReducers({
    createReducer,
    usersReducer,
    editReducer

});
export default reducers;