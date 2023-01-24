import axios from 'axios'


export const loginUser = (username, password) => async (dispatch) => {

    try {

        dispatch({type: 'LOGIN_USER_REQUEST'})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login/', 
            {'username': username, 'password': password},
            config    
        )

        dispatch({
            type: 'LOGIN_USER_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: 'LOGIN_USER_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }

}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')

    dispatch({type: 'LOGOUT_USER'})

    dispatch({type: 'BOARD_LIST_ALL_RESET'})

    dispatch({type: 'BOARD_LIST_RESET'})

    dispatch({type: 'GET_TASK_RESET'})

    dispatch({type: 'TASK_STATUS_RESET'})
}

export const registerUser = (userData) => async (dispatch) => {
    try {   

        dispatch({type: 'REGISTER_USER_REQUEST'})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/register/',
            userData,
            config
        )

        dispatch({
            type: 'REGISTER_USER_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: 'REGISTER_USER_FAIL',
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })
    }
}