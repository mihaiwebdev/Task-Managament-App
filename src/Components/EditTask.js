import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editTask } from '../actions/taskActions'
import Spinner from '../Components/Spinner'
import Message from '../Components/Message'

const EditTask = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id, taskID } = useParams()

    const [task, setTask] = useState([])
    const [subtasks, setSubtasks] = useState([])

    const [taskTitle, setTaskTitle] = useState('default')
    const [taskDescription, setTaskDescription] = useState('default')
    const [editedSubtask, setEditedSubtask] = useState([])
    const [deletedSubtask, setDeletedSubtask] = useState([])
    const [newSubtask, setNewSubtask] = useState([])
    const [newSubtaskId, setNewSubtaskId] = useState(0)
    const [currentStatus, setCurrentStatus] = useState('')

    const boardList = useSelector(state => state.boardList)
    const { board } = boardList

    const editedTask = useSelector(state => state.editedTask)
    const {loading: editLoading, error: editError, success: editSuccess} = editedTask

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

            if (editSuccess) {
                navigate(`/board/${id}/`)
            }
        }
        
    }, [navigate, id, board, taskID, subtasks, editSuccess])
        

        const hideModal = (e) => {
            
            if (e.target.classList.contains('task-modal')) {
            navigate(`/board/${id}`)
        }
    
    } 

    const deleteSubtask = (id, isNewSubtask) => {

        if (window.confirm('Are you sure you want to delete this subtask?')) {

            if (isNewSubtask) {
            
                setNewSubtask(prevState => {
                    return [...prevState.filter(subtask => subtask.id !== id)]
                })

            } else {
                setSubtasks(state => {
                    return [...state.filter(subtask => subtask.id !== id)]
                })

                setDeletedSubtask(prevState => {
                    return [...prevState, {'deleteSubtask': id}]
                })
            }

        }
    }

    const addNewSubtask = (e) => {
        e.preventDefault()
        setNewSubtaskId(prevState => prevState + 1)

        setNewSubtask((prevState) => {
            
            return [...prevState, {'id': newSubtaskId}]
        })

    }   
    
    const changeSubtask = (subtaskID, e, newSubtask) => {

        setEditedSubtask(prevState => {

            return [...prevState.filter(subtask => subtask.id !== subtaskID),
                {'id': subtaskID,
                 'title': e,
                 'new': newSubtask}
            ]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        dispatch(editTask(task.id, {
            "title": taskTitle === 'default' ? task.title : taskTitle,
            "description": taskDescription === 'default' ? task.description : taskDescription,
            "subtasks": editedSubtask,
            "deletedSubtask": deletedSubtask,
            "status": currentStatus,
        }))

    } 


    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
                <div>
                    <h2 className="modal-task-title">Edit Task</h2>
                </div>
                {editLoading ? <Spinner/> : editError ? <Message>{editError}</Message> 
                 : (<>      
                
                    <form id='edit-task' >

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Title</label>
                            <input type="text" defaultValue={taskTitle === 'default' ? task.title : taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}/>
                        </div>

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="description">Description</label>
                            <textarea type="text" defaultValue={taskDescription === 'default' ? task.description : taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                placeholder="e.g.  It's always good to take a break. This 15 
                                minute break will recharge the batteries a little."
                                />
                        </div>

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="subtasks">Subtasks</label>
                            
                            <div className='subtasks-container'> 
                            {subtasks.map((subtask) => (
                                    <div key={subtask.id} className='subtask-input'>
                                        <input className='subtask-input-field' 
                                        defaultValue={subtask.title} 
                                        onChange={(e) => changeSubtask(subtask.id, e.target.value, 'old')}
                                        type="text" id={subtask.id} />
                                        <svg onClick={() => deleteSubtask(subtask.id, false)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                    </div>
                            
                                ))
                                }

                                {newSubtask.map((subtask) => (
                                    <div key={subtask.id} className='subtask-input'>
                                        <input className='subtask-input-field'   
                                        onChange={(e) => 
                                        changeSubtask(subtask.id, e.target.value, 'new')}
                                        type="text" id={subtask.id} />
                                        <svg onClick={() => deleteSubtask(subtask.id, true)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                    </div>
                                ))}

                            </div>
                            <button className='btn-secondary add-subtask' onClick={(e) => addNewSubtask(e)} >+ Add New Subtask</button>
                        </div>
                        
                        <p className="subtask-title mt-3">Status</p>

                        <select id='select-status' onChange={(e) => setCurrentStatus(e.target.value)}
                        className='task-status' value={currentStatus}>
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>

                        <input onClick={(e) => handleSubmit(e)} type='submit' className='btn-primary-s' value={'Save Changes'}/>
                    </form>

                </>)}

            </div>

        </div>
    )
}

export default EditTask
