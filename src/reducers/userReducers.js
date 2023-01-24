export const userLoginReducer = (state = { }, action) => {
    switch(action.type) {
        case 'LOGIN_USER_REQUEST':
            return {
                loading: true,
                userInfo: [],
            }

        case 'LOGIN_USER_SUCCESS':
            return {
                loading: false,
                userInfo: action.payload
            }

        case 'LOGIN_USER_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        
        case 'LOGOUT_USER':
            return { userInfo: [] }


        default:
            return state
    }
}


export const userRegisterReducer = (state = { }, action) => {
    switch(action.type) {
        case 'REGISTER_USER_REQUEST':
            return {
                loading: true,
            }

        case 'REGISTER_USER_SUCCESS':
            return {
                loading: false,
                userInfo: action.payload
            }

        case 'REGISTER_USER_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        
        case 'LOGOUT_USER':
            return {  }


        default:
            return state
    }
}