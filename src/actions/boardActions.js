import axios from 'axios'


export const listAllBoards = () => async(dispatch) => {

    try {  
        dispatch({
            type: 'BOARD_LIST_ALL_REQUEST'
        })

        const { data } = await axios.get('/api/boards/')

        dispatch({
            type: 'BOARD_LIST_ALL_SUCCESS',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'BOARD_LIST_ALL_FAIL',
            payload: error.reseponse && error.reseponse.data.detail
            ? error.reseponse.data.detail
            : error.message
        })
        
    }
}


export const listBoard = (id) => async (dispatch) => {

    try {

        dispatch({ type: 'BOARD_LIST_REQUEST' })

        const { data } = await axios.get(`/api/board/${id}`)

        dispatch({
            type: 'BOARD_LIST_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'BOARD_LIST_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


// Update subtask status
export const updatedTaskStatus = (id, isCompleted, taskID) => async (dispatch) => {

    try {

        dispatch({ type: 'TASK_STATUS_REQUEST' })

        const { data } = await axios.put(
            `/api/subtask/status/`,
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



