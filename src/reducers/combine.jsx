import {combineReducers} from "redux"
import errorReducer from './error-reducer'
import databaseReducer from './database-reducer'
import userReducer from './user-reducer'
const reducers = combineReducers({
    errorState: errorReducer,
    dbState: databaseReducer,
    userState: userReducer,
});

export default reducers;