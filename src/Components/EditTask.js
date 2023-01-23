import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteSubtask, getTask, createSubtask,
         editTask } from '../actions/taskActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'


const EditTask = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id, taskID } = useParams()

    const [taskTitle, setTaskTitle] = useState('default')
    const [taskDescription, setTaskDescription] = useState('default')

    const taskList = useSelector(state => state.taskList)
    const { loading:taskLoading, error:taskError, task, subtasks } = taskList

    const addSubtask = useSelector(state => state.addSubtask)
    const { success:addSubtaskSuccess, loading:addSubtaskLoading, error:addSubtaskError} = addSubtask

    const deletedSubtask = useSelector(state => state.deletedSubtask)
    const { success:deleteSubtaskSuccess, loading:deleteLoading, error:deleteError} = deletedSubtask


    useEffect(() => {

        if (task && task.length === 0){
            dispatch(getTask(taskID))
        }
        
        if (deleteSubtaskSuccess) {
            dispatch(getTask(taskID))
            dispatch({type: 'DELETE_SUBTASK_RESET'})
        } 
        
        if (addSubtaskSuccess) {
            dispatch(getTask(taskID))
            dispatch({type: 'ADD_SUBTASK_RESET'})   
        }
        
        
    }, [task, taskID,
        deleteSubtaskSuccess, addSubtaskSuccess, dispatch])
        

        const hideModal = (e) => {
            
            if (e.target.classList.contains('task-modal')) {
            navigate(`/board/${id}`)
        }
    
    } 

    const handleDeleteSubtask = (id) => {

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
            "title": taskTitle === 'default' ? task.title : taskTitle,
            "description": taskDescription === 'default' ? task.description : taskDescription,
            "subtasks": changedSubtasks,
        }))

        navigate(`/board/${id}/task/${taskID}`)

    } 


    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
            {taskLoading ? <Loader /> 
            : taskError ? <Message variant='danger'> No task data</Message>
            : (<>
                <div>
                     <h2 className="modal-task-title">Edit Task</h2>
                </div>

                <form id='edit-task'>

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
                        {deleteLoading || addSubtaskLoading ? <Loader /> 
                        : deleteError || addSubtaskError ? <Message variant='danger'>
                            {deleteError ? deleteError : addSubtaskError && addSubtaskError}
                        </Message> 
                        : (<div className='subtasks-container'> 
                            {subtasks.map(subtask => (
                                <div key={subtask.id} className='subtask-input'>
                                    <input className='subtask-input-field' id={subtask.id}
                                     type="text" defaultValue={subtask.title} />
                                    <svg onClick={() => handleDeleteSubtask(subtask.id)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                </div>
                            ))}
                          </div>)
                        }
                        
                        <button className='btn-secondary add-subtask' onClick={handleAddSubtask}>+ Add New Subtask</button>
                    </div>
                    
                    <p className="subtask-title mt-3">Status</p>

                    <div className='task-status'>
                        <p>{task.status}</p>
                    </div>

                    <input type='submit' onClick={(e) => handleSubmit(e)} className='btn-primary-s' value={'Save Changes'}/>
                </form>

                </>)}

            </div>

        </div>
    )
}

export default EditTask
