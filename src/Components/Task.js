import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listBoard } from '../actions/boardActions'
import { updateTaskStatus } from '../actions/taskActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'


const Task = () => {

    const dispatch = useDispatch()

    const [showActions, setShowActions] = useState(false)
   
    const boardList = useSelector(state => state.boardList)
    const { board } = boardList

    const taskStatus = useSelector(state => state.taskStatus)
    const { success, taskUpdate } = taskStatus

    const taskList = useSelector(state => state.taskList)
    const { loading:taskLoading, error:taskError, task, subtasks } = taskList


    const showSettings = () => {
        
        if (showActions) {
            setShowActions(false)

        } else {
            setShowActions(true)
        } 

    }

    const hideModal = (e) => {
        if (e.target.classList.contains('task-modal')) {

            document.querySelector('.task-modal').style.display = 'none'
            setShowActions(false)

            if (success) {
                dispatch({type: 'TASK_STATUS_RESET'})
            }
        }
    }

    const setTaskStatus = (e, id) => {
        
        dispatch(updateTaskStatus(id, e.target.checked, task.id))
        
        document.getElementById(`subtask-title-${id}`).classList.toggle('subtask-done')

        dispatch(listBoard(board[0].board.id))

    }

    const editTask = () => {
        document.querySelector('.task-modal').style.display = 'none'
        document.getElementById('edit-task-modal').style.display = 'block'
        setShowActions(false)
    }

    return (
        <div className='task-modal' onClick={(e) => hideModal(e)}>
           
            <div className="open-task-card mx-auto">

                {taskLoading ? <Loader/> 
                : taskError ? <Message variant='danger'> No task data</Message>
                : (<>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className="modal-task-title">{task.title}</h2>
                        <div className='settings-dots' onClick={showSettings}>
                            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                        </div>
                        <div className={`modal-actions ${showActions ? 'd-block' : 'd-none'}`}>
                            <p onClick={editTask}>Edit Task</p>
                            <p className="delete-task">Delete Task</p>
                        </div>
                    </div>
                    <p className="modal-task-description">{task.description}</p>

                    <p className="subtask-title">Subtasks ({subtasks.length})</p>

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

                    <p className="subtask-title mt-3">Current Status</p>

                    <div className='task-status'>
                        <p>{success ? taskUpdate.status : task.status}</p>
                    </div>

                    </>) 
                }
                
            </div>

        </div>
    )
}

export default Task
