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
                error: action.payload,
            }

        case 'GET_TASK_RESET':
            return { task: [], subtasks: [] }
            
        default:
            return state
    }
}


// Edit Task
export const editTaskReducer = (state = { }, action) => {
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
            return { }

        default:
            return state
    }
}


// Create task
export const createTaskReducer = (state = { }, action) => {
    switch(action.type) {
        case 'CREATE_TASK_REQUEST':
            return {
                loading: true
            }

        case 'CREATE_TASK_SUCCESS':
            return {
                loading: false,
                success: true,
                newTask: action.payload,
            }

        case 'CREATE_TASK_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        case 'CREATE_TASK_RESET':
            return { }

        default:
            return state
    }
} 


// Delete task
export const deleteTaskReducer = (state = { }, action) => {
    switch(action.type) {
        case 'DELETE_TASK_REQUEST':
            return {
                loading: true,
            }

        case 'DELETE_TASK_SUCCESS':
            return {
                loading: false,
                success: true,
            }

        case 'DELETE_TASK_FAIL':
            return {
                loading: false,
                error: true,
            }

        case 'DELETE_TASK_RESET':
            return { }
            

        default:
            return state
    }
}


// Update task status
export const updateTaskStatusReducer = (state = {  }, action) => {
    switch(action.type) {
        case 'TASK_STATUS_REQUEST':
            return {
                loading: true,
            }

        case 'TASK_STATUS_SUCCESS':
            return {
                loading: false,
                success:true,

            }

        case 'TASK_STATUS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        
        case 'TASK_STATUS_RESET':
            return {  }


        default:
            return state
    }
}

