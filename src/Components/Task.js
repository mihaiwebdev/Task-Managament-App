import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatedTaskStatus, listBoard } from '../actions/boardActions'
import Message from '../Components/Message'


const Task = ( {taskData} ) => {

    const dispatch = useDispatch()

    const [showActions, setShowActions] = useState(false)
   
    const boardList = useSelector(state => state.boardList)
    const { board } = boardList

    const taskStatus = useSelector(state => state.taskStatus)
    const { success, taskUpdate } = taskStatus

    const showSettings = () => {
        
        if (showActions) {
            setShowActions(false)

        } else {
            setShowActions(true)
        } 

    }

    const hideModal = (e) => {
        if (e.target.classList.contains('task-modal')) {

            dispatch({type: 'TASK_STATUS_RESET'})
            document.querySelector('.task-modal').style.display = 'none'
            setShowActions(false)
        }
    }

    const setTaskStatus = (e, id) => {
        
        dispatch(updatedTaskStatus(id, e.target.checked, taskData[0].id))
        
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
            {!taskData ? <Message variant='danger'> No task data</Message>
             : 
                <div className="open-task-card mx-auto">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className="modal-task-title">{taskData[0].title}</h2>
                        <div className='settings-dots' onClick={showSettings}>
                            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
                        </div>
                        <div className={`modal-actions ${showActions ? 'd-block' : 'd-none'}`}>
                            <p onClick={editTask}>Edit Task</p>
                            <p className="delete-task">Delete Task</p>
                        </div>
                    </div>
                    <p className="modal-task-description">{taskData[0].description}</p>

                    <p className="subtask-title">Subtasks ({taskData[1].length})</p>

                    {taskData[1].map(subtask => (

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
                        <p>{success ? taskUpdate.status : taskData[0].status}</p>
                    </div>
                    
                    
                </div>
            }

        </div>
    )
}

export default Task
