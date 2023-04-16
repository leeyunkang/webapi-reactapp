import {createStore, applyMiddleware } from 'redux'
import recordReducer from '../reducer/RecordReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

//const store = createStore(recordReducer, applyMiddleware(thunk))

const INITIAL_STATE = {
    records: [],
    isResponse: false,
    selectedRecord: [],
}

const middleware = [thunk];

const store = createStore(
    recordReducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store