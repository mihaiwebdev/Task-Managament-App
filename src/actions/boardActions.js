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

        const { data } = await axios.get(`/api/boards/${id}/`)

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


export const createBoard = (board) => async (dispatch) => {

    try {

        dispatch({ type: 'BOARD_CREATE_REQUEST' })

        const { data } = await axios.post(`/api/boards/create/`, board)

        dispatch({
            type: 'BOARD_CREATE_SUCCESS',
            payload: data

        })


    } catch (error) {
        dispatch({
            type: 'BOARD_CREATE_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


export const editBoard = (id, boardChange) => async (dispatch) => {
    try {

        dispatch({type: 'EDIT_BOARD_REQUEST'})

        const { data } = await axios.put(`/api/boards/${id}/edit/`, {"title": boardChange})

        dispatch({
            type: 'EDIT_BOARD_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'EDIT_BOARD_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


export const deleteBoard = (id) => async (dispatch) => {
    try {

        dispatch({type: 'DELETE_BOARD_REQUEST'})

        await axios.delete(`/api/boards/${id}/delete/`)

        dispatch({type: 'DELETE_BOARD_SUCCESS'})


    } catch (error) {
        dispatch({
            type: 'DELETE_BOARD_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}


