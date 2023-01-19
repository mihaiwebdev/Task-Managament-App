import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAllBoards, listBoard } from '../actions/boardActions'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const HomeScreen = () => {

    const dispatch = useDispatch()

    const boardList = useSelector(state => state.boardList)
    const { error, loading, board } = boardList

    useEffect(() => {

        dispatch(listAllBoards())
        
        dispatch(listBoard(1))

    }, [dispatch])

    return (
        <>
            <Header />

            <main className='d-flex'>

                <Sidebar />

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
                 :  board.length < 1 ? (<div></div>)
                 : (     
                        <div className='tasks-layout'>
                            {board[1].cols.length < 1 
                             ? <div className='mx-auto my-auto d-flex flex-column align-items-center'>
                                    <p className='gray-text'>This board is empty. Create a new column to get started.</p>
                                    <button className='mb-5 btn-primary-l add-task'>
                                        + Add New Column
                                    </button>
                                </div>
                             : 
                             (<div className='d-flex'>

                                {board[1].cols.map((col) => (
                                    <div key={col.id} className='board-col'>
                                        <div className='d-flex mt-3'>
                                            {col.name.toLowerCase() === 'todo' ? (<div className='dot blue-dot'></div>)
                                            : col.name.toLowerCase() === 'doing' ? (<div className='dot purple-dot'></div>)
                                            : col.name.toLowerCase() === 'done' ? (<div className='dot green-dot'></div>)
                                            : (<div className='dot'></div>)    
                                            }
                                            <h2 className='col-title ms-2'>{col.name.toUpperCase()}</h2>
                                        </div>
                                        
                                        {board[2].tasks.map(task => 
                                            task.column === col.id && (
                                                <div key={task.id} className="task-card">
                                                    <h2 className="task-card-title">{task.title}</h2>
                                                    <p className="task-card-subtasks">subtasks</p>
                                                </div>
                                            )
                                        )}
                                        
                                    </div> 
                                ))}

                                <div className='new-col'>
                                    <h2>+ New Column</h2>
                                </div>

                             </div>) 
                            }
                        </div>
                    )
                }
            </main>
        </>
    )
}

export default HomeScreen
