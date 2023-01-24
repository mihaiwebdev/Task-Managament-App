import axios from 'axios'


export const listAllBoards = () => async(dispatch, getState) => {

    try {  
        dispatch({
            type: 'BOARD_LIST_ALL_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/boards/', config)

        dispatch({
            type: 'BOARD_LIST_ALL_SUCCESS',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'BOARD_LIST_ALL_FAIL',
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
        
    }
}


export const listBoard = (id) => async (dispatch, getState) => {

    try {

        dispatch({ type: 'BOARD_LIST_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/boards/${id}/`, config)

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


export const createBoard = (board) => async (dispatch, getState) => {

    try {

        dispatch({ type: 'BOARD_CREATE_REQUEST' })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/boards/create/`, board, config)

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


export const editBoard = (id, boardChange) => async (dispatch, getState) => {
    try {

        dispatch({type: 'EDIT_BOARD_REQUEST'})

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/boards/${id}/edit/`,
            {"title": boardChange},
            config
         )

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


export const deleteBoard = (id) => async (dispatch, getState) => {
    try {

        dispatch({type: 'DELETE_BOARD_REQUEST'})

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/boards/${id}/delete/`, config)

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


