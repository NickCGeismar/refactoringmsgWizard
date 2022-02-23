import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import combinedReducer from './redux'
import {createLogger} from 'redux-logger'

const store = createStore(
    combinedReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )

)

export default store