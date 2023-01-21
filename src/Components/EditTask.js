import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listBoard } from '../actions/boardActions'
import { deleteSubtask, getTask, createSubtask,
         editTask } from '../actions/taskActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'


const EditTask = ( ) => {

    const dispatch = useDispatch()

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const taskStatus = useSelector(state => state.taskStatus)
    const { success, taskUpdate, error } = taskStatus

    const taskList = useSelector(state => state.taskList)
    const { loading:taskLoading, error:taskError, task, subtasks } = taskList

    const editedTask = useSelector(state => state.editedTask)
    const { success:editTaskSuccess, loading:editTaskLoading, error:editTaskError} = editedTask

    const addSubtask = useSelector(state => state.addSubtask)
    const { success:addSubtaskSuccess, loading:addSubtaskLoading, error:addSubtaskError} = addSubtask

    const deletedSubtask = useSelector(state => state.deletedSubtask)
    const { success:deleteSuccess, loading:deleteLoading, error:deleteError} = deletedSubtask

    const boardList = useSelector(state => state.boardList)
    const { board } = boardList



    useEffect(() => {
 
        if (deleteSuccess || addSubtaskSuccess) {
            dispatch(getTask(task.id))
            dispatch(listBoard(board[0].board.id))

            dispatch({type: 'DELETE_SUBTASK_RESET'})
            dispatch({type: 'ADD_SUBTASK_RESET'})            
            
        }


    }, [task, deleteSuccess, addSubtaskSuccess, editTaskSuccess, board, dispatch])

    const hideModal = (e) => {

        if (e.target.classList.contains('task-modal')) {

            if (success){

                dispatch({type: 'TASK_STATUS_RESET'})
            }

            if (editTaskSuccess) {
                dispatch(listBoard(board[0].board.id))
                dispatch({type: 'EDIT_TASK_RESET'})
            }

            document.getElementById('edit-task-modal').style.display = 'none'

        }
    } 

    const deleteTask = (id) => {

        if (window.confirm('Are you sure you want to delete this subtask?')) {

            dispatch(deleteSubtask(id))

        }
    }

    const handleAddSubtask = (e) => {
        e.preventDefault()

        dispatch(createSubtask({
            "task": task.id,
            "title": 'Type a new subtask',
        }))
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let changedSubtasks = []

        const subtasksInputs = document.querySelectorAll('.subtask-input-field')

        subtasksInputs.forEach(input => {

            changedSubtasks.push({
                "id": input.id,
                "title": input.value, 
            })
        })

        dispatch(editTask(task.id, {
            "title": taskTitle,
            "description": taskDescription,
            "subtasks": changedSubtasks,
        }))


    } 


    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
            {taskLoading || editTaskLoading ? <Loader /> 
            : taskError ? <Message variant='danger'> No task data</Message>
            : (<>
                <div>
                    {editTaskError ? <Message variant='danger'>{editTaskError}</Message>
                     : editTaskSuccess && <Message variant='success'>Task Saved!</Message>}
                     <h2 className="modal-task-title">Edit Task</h2>
                </div>

                <form id='edit-task'>

                    <div className='form-group'>
                        <label className='subtask-title' htmlFor="title">Title</label>
                        <input type="text" value={taskTitle.length > 0 ? taskTitle : task.title}
                         onChange={(e) => setTaskTitle(e.target.value)}/>
                    </div>

                    <div className='form-group'>
                        <label className='subtask-title' htmlFor="description">Description</label>
                        <textarea type="text" value={taskDescription.length > 0 ? taskDescription : task.description}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="e.g.  It's always good to take a break. This 15 
                            minute break will recharge the batteries a little."
                            />
                    </div>

                    <div className='form-group'>
                        <label className='subtask-title' htmlFor="subtasks">Subtasks</label>
                        {deleteLoading || addSubtaskLoading ? <Loader /> 
                        : deleteError || addSubtaskError ? <Message variant='danger'>
                            {deleteError ? deleteError : addSubtaskError && addSubtaskError}
                        </Message> 
                        : (<div id='edit-subtasks-group'> 
                            {subtasks.map(subtask => (
                                <div key={subtask.id} className='subtask-input'>
                                    <input className='subtask-input-field' id={subtask.id}
                                     type="text" defaultValue={subtask.title} />
                                    <svg onClick={() => deleteTask(subtask.id)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                </div>
                            ))}
                          </div>)
                        }
                        
                        <button className='btn-secondary' onClick={handleAddSubtask}>+ Add New Subtask</button>
                    </div>
                    
                    <p className="subtask-title mt-3">Status</p>

                    <div className='task-status'>
                        <p>{success ? taskUpdate.status : error ? 'error' : task.status}</p>
                    </div>

                    <input type='submit' onClick={(e) => handleSubmit(e)} className='btn-primary-s' value={'Save Changes'}/>
                </form>

                </>)}

            </div>

        </div>
    )
}

export default EditTask
