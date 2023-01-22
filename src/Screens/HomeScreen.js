import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { listAllBoards } from '../actions/boardActions'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'


const HomeScreen = () => {

    const location = useLocation()

    const dispatch = useDispatch()


    useEffect(() => {
        
        dispatch(listAllBoards())

    }, [dispatch, ])
    

    return (
        <>
            <Header />

            <main className='d-flex'>
                <Sidebar />
                
                {location.pathname === '/' 
                && <div className='w-100 d-flex justify-content-center align-items-center'>
                        <p className='gray-text'>No board selected ...</p>
                    </div>
                }
                
                <Outlet />

            </main>
        </>
    )
}

export default HomeScreen
