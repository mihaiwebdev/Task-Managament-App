import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { boardListReducer, boardListAllReducer,
         updatedTaskStatus } from './reducers/boardReducers'

const reducer = combineReducers({
    boardsList: boardListAllReducer,
    boardList: boardListReducer,
    taskStatus: updatedTaskStatus,
    
})

const initialState = { }

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store