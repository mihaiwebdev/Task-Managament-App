import axios from "axios"

// Get task
export const getTask = (id) => async (dispatch) => {

    try {
        
        dispatch({ type: 'GET_TASK_REQUEST'})

        const { data } = await axios.get(`/api/task/${id}/`)

        dispatch({ 
            type: 'GET_TASK_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'GET_TASK_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


// Update subtask status
export const updateTaskStatus = (id, isCompleted, taskID) => async (dispatch) => {

    try {

        dispatch({ type: 'TASK_STATUS_REQUEST' })

        const { data } = await axios.put(
            `/api/task/status/`,
            {'id': id,
            'isCompleted': isCompleted,
            'taskID': taskID 
            },
        )

        dispatch({
            type: 'TASK_STATUS_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'TASK_STATUS_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


// Add new subtask
export const createSubtask = (subtask) => async (dispatch) => {

    try {
        
        dispatch({ type: 'ADD_SUBTASK_REQUEST'})

        await axios.post(`/api/task/subtask/create/`, subtask)

        dispatch({ 
            type: 'ADD_SUBTASK_SUCCESS',
        })


    } catch (error) {
        dispatch({
            type: 'ADD_SUBTASK_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


// Delete subtask
export const deleteSubtask = (id) => async (dispatch) => {

    try {
        
        dispatch({ type: 'DELETE_SUBTASK_REQUEST'})

        await axios.delete(`/api/task/subtask/delete/${id}`)

        dispatch({ 
            type: 'DELETE_SUBTASK_SUCCESS',
        })


    } catch (error) {
        dispatch({
            type: 'DELETE_SUBTASK_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


// Edit task
export const editTask = (id, editedTask) => async (dispatch) => {

    try {
        
        dispatch({ type: 'EDIT_TASK_REQUEST'})

        await axios.put(`/api/task/${id}/edit/`, editedTask)

        dispatch({ 
            type: 'EDIT_TASK_SUCCESS',
        })


    } catch (error) {
        dispatch({
            type: 'EDIT_TASK_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


