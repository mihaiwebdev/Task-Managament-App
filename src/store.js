import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { boardListReducer, boardListAllReducer, } from './reducers/boardReducers'
import { updateTaskStatusReducer, deleteSubtaskReducer, getTaskReducer,
        addSubtaskReducer, editTaskReducer } from './reducers/taskReducers'

const reducer = combineReducers({
    boardsList: boardListAllReducer,
    boardList: boardListReducer,
    taskList: getTaskReducer,
    taskStatus: updateTaskStatusReducer,
    addSubtask: addSubtaskReducer,
    deletedSubtask: deleteSubtaskReducer,
    editedTask: editTaskReducer,
    
})

const initialState = { }

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store