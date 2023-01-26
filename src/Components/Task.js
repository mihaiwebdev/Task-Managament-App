import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateTaskStatus } from '../actions/taskActions'
import Spinner from '../Components/Spinner'
import Message from '../Components/Message'


const Task = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id, taskID } = useParams()

    const [task, setTask] = useState([])
    const [subtasks, setSubtasks] = useState([])
    const [showActions, setShowActions] = useState(false)
    const [currentStatus, setCurrentStatus] = useState('')
    const [checkSubtask, setCheckSubtask] = useState([])

    const boardList = useSelector(state => state.boardList)
    const { board } = boardList

    const taskStatus = useSelector(state => state.taskStatus)
    const { success: statusSuccess, loading: statusLoading, error: statusError } = taskStatus

    useEffect(() => {

        if (board && board.length > 0) {
            
            board[2].tasks.map(task => {

                if (task.id === parseInt(taskID)) {
                    setTask(task)
                    setCurrentStatus(task.status)

                    if (subtasks.length === 0) {

                        board[3].subtasks.map(subtask => {
                            
                            if (subtask.task === task.id) {
                                setSubtasks(prevState => {
                                    
                                    return [...prevState, subtask]
                                    
                                })
                                
                            }
                            
                            return null
                        })
                    }
                }

                return null
            })
        }

        if (statusSuccess) {
            navigate(-1)
        }

    }, [navigate, board, taskID, subtasks, statusSuccess])

    const showSettings = () => {
        
        if (showActions) {
            setShowActions(false)

        } else {
            setShowActions(true)
        } 

    }

    const hideModal = (e) => {
        if (e.target.classList.contains('task-modal') && !statusLoading) {

            setShowActions(false)
            navigate(`/board/${id}`)

        }
    }


    const setTaskStatus = (id, e) => {
      
        document.getElementById(`subtask-title-${id}`).classList.toggle('subtask-done')
          
        setCheckSubtask(state => {

            return [...state.filter(sbtask=> sbtask.id !== id),
                {'id': id,
                'isCompleted': e.target.checked
                }
            ]

        })
    }

    const editTask = () => {
        navigate(`/board/${id}/task/${taskID}/edit`)
        setShowActions(false)
    }

    const handleDeleteTask = () => {

        navigate(`/board/${id}/task/${taskID}/delete`)
    }

    const saveHandler = () => {
    
        if (checkSubtask.length > 0 || currentStatus) {
            dispatch(updateTaskStatus(checkSubtask, currentStatus, taskID)) 
            
            
        } else {
            navigate(-1)
        }
    }

    return (
        <div className='task-modal' onClick={(e) => hideModal(e)}>
           
            <div className="open-task-card mx-auto">
                {statusLoading ? <Spinner /> : statusError ? <Message>{statusError}</Message>
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
                                <input type="checkbox"
                                    onChange={(e) => setTaskStatus(subtask.id, e)}
                                defaultChecked={subtask.isCompleted} />
                                <span className="checkmark"></span>
                                <p id={`subtask-title-${subtask.id}`} className={subtask.isCompleted ? 'subtask-done' : ''}>
                                    {subtask.title}
                                </p>
                            </label>
                        
                        </div>
                    ))}
                    </div>
                    <p className="subtask-title mt-3">Current Status</p>

                    <select id='select-status' className='task-status' 
                        onChange={(e) => setCurrentStatus(e.target.value)} 
                        value={currentStatus}>
                        <option value="Todo">Todo</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>

                    <button onClick={saveHandler} disabled={checkSubtask.length > 0 || currentStatus !== task.status
                        ? false : true}
                        className={`btn-primary-s mt-4 ${checkSubtask.length > 0 || currentStatus !== task.status 
                        ? '' : 'opacity-25'}`}>Save Changes
                    </button>

                </>)}

            </div>

        </div>
    )
}

export default Task
