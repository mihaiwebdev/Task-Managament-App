import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { listAllBoards, listBoard } from '../actions/boardActions'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Loader from '../Components/Loader'
import Message from '../Components/Message'


const HomeScreen = () => {

    const location = useLocation()

    const dispatch = useDispatch()

    const deletedBoard = useSelector(state => state.deletedBoard)
    const { loading, error, success } = deletedBoard

    const createdBoard = useSelector(state => state.createdBoard)
    const { success: createdSuccess, } = createdBoard

    const editedBoard = useSelector(state => state.editedBoard)
    const { success: editSuccess, board} = editedBoard


    useEffect(() => {
        
        dispatch(listAllBoards())

        if (success) {
            dispatch({type: 'DELETE_BOARD_RESET'})
            dispatch({type: 'BOARD_LIST_RESET'})
        }

        if (createdSuccess) {
            dispatch({type: 'BOARD_CREATE_RESET'})
        }

        if (editSuccess) {
            dispatch(listBoard(board.id))
            dispatch({type: 'EDIT_BOARD_RESET'})
        }


    }, [dispatch, success, editSuccess, createdSuccess, board])
    

    return (
        <>
            <Header />

            <main className='d-flex'>
                <Sidebar screen={'desktop'} />
                
                {loading ? < Loader /> : error && <Message variant='danger'>{error}</Message>}
                {location.pathname === '/' 
                && <div className='no-board'>
                        <p className='gray-text'>No board selected ...</p>
                    </div>
                }
                
                <Outlet />

            </main>
        </>
    )
}

export default HomeScreen
