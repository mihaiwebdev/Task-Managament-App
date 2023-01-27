import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Outlet, useNavigate } from 'react-router-dom'
import { listBoard } from '../actions/boardActions'
import { motion } from 'framer-motion'
import Message from '../Components/Message'
import Spinner from '../Components/Spinner'

const Board = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const boardList = useSelector(state => state.boardList)
    const { error, loading, board } = boardList

    const createdTask = useSelector(state => state.createdTask)
    const {  success:createSuccess } = createdTask

    const deletedTask = useSelector(state => state.deletedTask)
    const { success:deleteTaskSuccess } = deletedTask

    const taskStatus = useSelector(state => state.taskStatus)
    const { success: statusSuccess } = taskStatus

    const editedTask = useSelector(state => state.editedTask)
    const { success: editSuccess } = editedTask

    let tasksWithSubtasks = []

    useEffect(() => {
        
        dispatch(listBoard(id))

        if (statusSuccess) {
            dispatch({type: 'TASK_STATUS_RESET'})
        }

        if (deleteTaskSuccess) {
            dispatch({type: 'DELETE_TASK_RESET'})
        }

        if (createSuccess) {
            dispatch({type: 'CREATE_TASK_RESET'})
        }

        if (editSuccess) {
            dispatch({type: 'EDIT_TASK_RESET'})
        }

    }, [id, statusSuccess, createSuccess, editSuccess,
         deleteTaskSuccess, dispatch])
    

    if (board && board.length > 0) {
            
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
           
            <div className='tasks-layout'>
                {loading ? <Spinner /> : error ? <Message variant='danger'>{error}</Message>
                    : board.length > 0 && (
                    <>
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
                                <motion.div className='d-flex mt-3'
                                    initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5}}>
                                    {col.name.toLowerCase() === 'todo' ? (<div className='dot blue-dot'></div>)
                                    : col.name.toLowerCase() === 'doing' ? (<div className='dot purple-dot'></div>)
                                    : col.name.toLowerCase() === 'done' ? (<div className='dot green-dot'></div>)
                                    : (<div className='dot'></div>)    
                                    }
                                    <h2 className='col-title ms-2'>{col.name.toUpperCase()} 
                                            ({board[2].tasks.filter(task => task.column === col.id).length})
                                    </h2>
                                </motion.div>
                                
                                {tasksWithSubtasks[0].map(task => 
                                    task.column === col.id && (
                                        <motion.div key={task.id}  onClick={() => showTaskModal(task.id)}
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.5}}>
                                            <div className="task-card">
                                                <h2 className="task-card-title">{task.title}</h2>
                                                <p className="task-card-subtasks">
                                                    subtasks <span>{task.subtasks.filter(sbtask => sbtask.isCompleted === true ).length} </span> 
                                                        of {task.subtasks.length}
                                                    </p>
                                            </div>
                                        </motion.div>
                                    )   
                                )}
                                
                            </div> 
                        ))}


                        <motion.div initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5}} onClick={() => navigate(`/board/${id}/new-task`)}>
                            <div className='new-col'>
                                <h2>+ New Task</h2>
                            </div>
                        </motion.div>

                        </div>) 
                    }
                    </>
                    )}
                </div>
        
            <Outlet/>
        
        </>
    )
}

export default Board
