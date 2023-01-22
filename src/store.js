import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { boardListReducer, boardListAllReducer, createBoardReducer} from './reducers/boardReducers'
import { updateTaskStatusReducer, deleteSubtaskReducer, getTaskReducer, createTaskReducer,
        addSubtaskReducer, editTaskReducer, deleteTaskReducer } from './reducers/taskReducers'

const reducer = combineReducers({
    boardsList: boardListAllReducer,
    boardList: boardListReducer,
    createdBoard: createBoardReducer,

    taskList: getTaskReducer,
    taskStatus: updateTaskStatusReducer,
    deletedTask: deleteTaskReducer,
    createdTask: createTaskReducer,

    addSubtask: addSubtaskReducer,
    deletedSubtask: deleteSubtaskReducer,
    editedTask: editTaskReducer,
    
})

const initialState = { }

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store