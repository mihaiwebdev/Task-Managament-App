// Get task
export const getTaskReducer = (state = { task: [], subtasks: [] }, action) => {
    switch(action.type) {
        case 'GET_TASK_REQUEST':
            return {
                loading: true,
            }

        case 'GET_TASK_SUCCESS':
            return {
                loading: false,
                task: action.payload.task,
                subtasks: action.payload.subtasks
            }

        case 'GET_TASK_FAIL':
            return {
                loading: false,
                error: true,
            }

        default:
            return state
    }
}



// Update subtask and task status
export const updateTaskStatusReducer = (state = { taskUpdate: [], subtaskUpdate: []}, action) => {
    switch(action.type) {
        case 'TASK_STATUS_REQUEST':
            return {
                loading: true,
            }

        case 'TASK_STATUS_SUCCESS':
            return {
                loading: false,
                success:true,
                taskUpdate: action.payload.task,
                subtaskUpdate: action.payload.subtask
            }

        case 'TASK_STATUS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        
        case 'TASK_STATUS_RESET':
            return state = { }


        default:
            return state
    }
}


// Add new subtask
export const addSubtaskReducer = (state = { }, action) => {
    switch(action.type) {
        case 'ADD_SUBTASK_REQUEST':
            return {
                loading: true,
            }

        case 'ADD_SUBTASK_SUCCESS':
            return {
                loading: false,
                success:true,
            }

        case 'ADD_SUBTASK_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        
        case 'ADD_SUBTASK_RESET':
            return state = { }


        default:
            return state
    }
}


// Delete subtask
export const deleteSubtaskReducer = (state = { }, action) => {
    switch(action.type) {
        case 'DELETE_SUBTASK_REQUEST':
            return {
                loading: true,
            }

        case 'DELETE_SUBTASK_SUCCESS':
            return {
                loading: false,
                success: true,
            }

        case 'DELETE_SUBTASK_FAIL':
            return {
                loading: false,
                error: true,
            }

        case 'DELETE_SUBTASK_RESET':
            return {
                state: { }
            }

        default:
            return state
    }
}


// Edit Task
export const editTaskReducer = (state = {  }, action) => {
    switch(action.type) {
        case 'EDIT_TASK_REQUEST':
            return {
                loading: true,
            }

        case 'EDIT_TASK_SUCCESS':
            return {
                loading: false,
                success: true,
            }

        case 'EDIT_TASK_FAIL':
            return {
                loading: false,
                error: true,
            }

        case 'EDIT_TASK_RESET':
            return {
                state: {}
            }

        default:
            return state
    }
}
