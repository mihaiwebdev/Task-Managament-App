import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { boardListReducer, boardListAllReducer, createBoardReducer
        , deleteBoardReducer, editBoardReducer} from './reducers/boardReducers'
import { updateTaskStatusReducer, getTaskReducer, createTaskReducer,
         editTaskReducer, deleteTaskReducer } from './reducers/taskReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    boardsList: boardListAllReducer,
    boardList: boardListReducer,
    createdBoard: createBoardReducer,
    editedBoard: editBoardReducer,
    deletedBoard: deleteBoardReducer,

    taskList: getTaskReducer,
    taskStatus: updateTaskStatusReducer,
    deletedTask: deleteTaskReducer,
    createdTask: createTaskReducer,
    editedTask: editTaskReducer,
    
})

const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')) : []

const initialState = { userLogin: { userInfo: userInfoFromStorage }}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store