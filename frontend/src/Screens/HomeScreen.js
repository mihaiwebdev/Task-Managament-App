import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { listAllBoards } from '../actions/boardActions'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'


const HomeScreen = () => {

    const location = useLocation()
    const dispatch = useDispatch()  
    const navigate = useNavigate()

    const createdBoard = useSelector(state => state.createdBoard)
    const {success:successCreate} = createdBoard

    const deletedBoard = useSelector(state => state.deletedBoard)
    const {  success: deletedSuccess } = deletedBoard

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {

        if (userInfo && userInfo.id) {
            dispatch(listAllBoards())

        }

        if (successCreate) {
            dispatch({type: 'BOARD_CREATE_RESET'})
            dispatch({type: 'BOARD_LIST_RESET'})
        }

        if (deletedSuccess) {
            dispatch({type: 'DELETE_BOARD_RESET'})
            dispatch({type: 'BOARD_LIST_RESET'})
        }

    }, [dispatch, userInfo, deletedSuccess, successCreate])
    

    return (
        <>
            <Header />

            <main className='d-flex'>
                <Sidebar screen={'desktop'} />
                
                {userInfo && userInfo.length === 0
                 ? <div className='mx-auto my-auto d-flex flex-column'>
                    <button onClick={() => navigate('/login')} className='btn-primary-l'>Log In</button>
                    <button onClick={() => navigate('/register')} className='btn-secondary w-100  mt-3'>Register</button>
                 </div> 
                  
                 : location.pathname === '/' && 
                    <div className='no-board'>
                        <p className='gray-text'>No board selected ...</p>
                    </div>
                }
                
                <Outlet />

            </main>
        </>
    )
}

export default HomeScreen
