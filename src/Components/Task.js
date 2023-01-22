import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateTaskStatus, deleteTask, getTask } from '../actions/taskActions'
import { listBoard } from '../actions/boardActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'


const Task = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id, taskID } = useParams()

    const [showActions, setShowActions] = useState(false)

    const taskStatus = useSelector(state => state.taskStatus)
    const { success, loading, error} = taskStatus

    const taskList = useSelector(state => state.taskList)
    const { loading:taskLoading, error:taskError, task, subtasks } = taskList

    const editedTask = useSelector(state => state.editedTask)
    const { success:editTaskSuccess } = editedTask


    useEffect(() => {

        if (success) {
            dispatch(listBoard(id))
            dispatch({type: 'TASK_STATUS_RESET'})

        } else {
            dispatch(getTask(taskID))
        }

        if (editTaskSuccess) {

            dispatch(listBoard(id))
            dispatch({type: 'EDIT_TASK_RESET'})
        }
        
    }, [id, taskID, success, editTaskSuccess, dispatch])


    const showSettings = () => {
        
        if (showActions) {
            setShowActions(false)

        } else {
            setShowActions(true)
        } 

    }

    const hideModal = (e) => {
        if (e.target.classList.contains('task-modal')) {

            setShowActions(false)
            navigate(`/board/${id}`)

        }
    }

    const setTaskStatus = (e, id) => {
        
        dispatch(updateTaskStatus(id, e.target.checked, task.id))
        
        document.getElementById(`subtask-title-${id}`).classList.toggle('subtask-done')

    }

    const editTask = () => {
        navigate(`/board/${id}/task/${taskID}/edit`)
        setShowActions(false)
    }

    const handleDeleteTask = () => {
        if (window.confirm('Are you sure you want to delete this task?'))
        dispatch(deleteTask(task.id))
        navigate(`/board/${id}`)
    }

    return (
        <div className='task-modal' onClick={(e) => hideModal(e)}>
           
            <div className="open-task-card mx-auto">

                {taskLoading || loading ? <Loader/> 
                : taskError || error ? <Message variant='danger'> No task data</Message>
                : (<>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className="modal-task-title">{task.title}</h2>
                        <div className='settings-dots' onClick={showSettings}>
                            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                        </div>
                        <div className={`modal-actions ${showActions ? 'd-block' : 'd-none'}`}>
                            <p onClick={editTask}>Edit Task</p>
                            <p onClick={handleDeleteTask} className="delete-task">Delete Task</p>
                        </div>
                    </div>
                    <p className="modal-task-description">{task.description}</p>

                    <p className="subtask-title">Subtasks ({subtasks.length})</p>

                    <div className='subtasks-container'>
                    {subtasks.map(subtask => (

                        <div key={subtask.id} className='subtask'>
                            <label className="checkbox-container">
                                <input type="checkbox" onChange={(e) => setTaskStatus(e, subtask.id)}
                                defaultChecked={subtask.isCompleted ? true : false} />
                                <span className="checkmark"></span>
                                <p id={`subtask-title-${subtask.id}`} className={subtask.isCompleted ? 'subtask-done' : ''}>
                                    {subtask.title}
                                </p>
                            </label>
                        
                        </div>
                    ))}
                    </div>
                    <p className="subtask-title mt-3">Current Status</p>

                    <div className='task-status'>
                        <p>{ task.status }</p>
                    </div>

                    </>) 
                }
                
            </div>

        </div>
    )
}

export default Task
