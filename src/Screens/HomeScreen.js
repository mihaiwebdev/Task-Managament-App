import Header from '../Components/Header'
import { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'

const HomeScreen = () => {

  const [message, setMessage] = useState('')

    useEffect(() => {

        setMessage('This board is empty. Create a new column to get started.')

    }, [message, setMessage])

    

    return (
        <>
            <Header />

            <main className='d-flex'>

                <Sidebar />

                {/* <div className='mx-auto my-auto d-flex flex-column align-items-center'>
                    <p className='gray-text '>{message}</p>
                    <button className='mb-5 btn-primary-l add-task'>
                        + Add New Column
                    </button>
                </div> */}

            </main>
        </>
    )
}

export default HomeScreen
