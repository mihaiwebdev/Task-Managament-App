import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Outlet, useNavigate } from 'react-router-dom'
import { listBoard } from '../actions/boardActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const Board = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const boardList = useSelector(state => state.boardList)
    const { error, loading, board } = boardList

    const createdTask = useSelector(state => state.createdTask)
    const { error:createError, loading:createLoading, success:createSuccess } = createdTask

    const deletedTask = useSelector(state => state.deletedTask)
    const { loading:deleteLoading, error:deleteError, success:deleteTaskSuccess } = deletedTask


    let tasksWithSubtasks = []

    useEffect(() => {
        
        dispatch(listBoard(id))

        if (deleteTaskSuccess) {
            dispatch({type: 'TASK_DELETE_RESET'})
        }

        if (createSuccess) {
            dispatch({type: 'TASK_CREATE_RESET'})
        }

    }, [id, createSuccess, deleteTaskSuccess, dispatch])
    

    if (board.length > 0) {
            
        const newTaskObj = board[2].tasks.map(task => {

            let subtasks = []

            board[3].subtasks.map(subtask => {
                
                if (subtask.task === task.id) {

                    subtasks.push(subtask)
                }

                return null
            })

            return task = {...task, "subtasks": subtasks}
            
        }) 
       
        tasksWithSubtasks.push(newTaskObj)
    } 


    const showTaskModal = (taskID) => {

        navigate(`/board/${id}/task/${taskID}`)

    }
    
    return (
        <>
            {loading || deleteLoading || createLoading ? <Loader /> 
             : error || deleteError || createError 
             ? <Message variant='danger'>{error}</Message> : board.length > 0
             && ( <div className='tasks-layout'>
                    {board[2].tasks.length < 1 
                        ? <div className='mx-auto my-auto d-flex flex-column align-items-center'>
                            <p className='gray-text'>This board is empty. Create a new task to get started.</p>
                            <button onClick={() => navigate(`/board/${id}/new-task`)} className='mb-5 btn-primary-l add-task'>
                                + Add New Task
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
                                    <h2 className='col-title ms-2'>{col.name.toUpperCase()} 
                                         ({board[2].tasks.filter(task => task.column === col.id).length})
                                    </h2>
                                </div>
                                
                                {tasksWithSubtasks[0].map(task => 
                                    task.column === col.id && (
                                        <div key={task.id} className="task-card" onClick={() => showTaskModal(task.id)}>
                                            <h2 className="task-card-title">{task.title}</h2>
                                            <p className="task-card-subtasks">
                                                subtasks <span>{task.subtasks.filter(sbtask => sbtask.isCompleted === true ).length} </span> 
                                                    of {task.subtasks.length}
                                                </p>
                                        </div>
                                    )
                                )}
                                
                            </div> 
                        ))}

                        <div onClick={() => navigate(`/board/${id}/new-task`)} className='new-col'>
                            <h2>+ New Task</h2>
                        </div>

                        </div>) 
                    }
                 </div>
                )
            }

            <Outlet/>
        
        </>
    )
}

export default Board
