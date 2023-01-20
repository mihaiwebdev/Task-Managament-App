import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatedTaskStatus, listBoard } from '../actions/boardActions'
import Message from '../Components/Message'



const EditTask = ( { taskData } ) => {

    const dispatch = useDispatch()

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const taskStatus = useSelector(state => state.taskStatus)
    const { success, taskUpdate } = taskStatus


    useEffect(() => {

        if (taskData !== undefined) {

            setTaskTitle(taskData[0].title)
            setTaskDescription(taskData[0].description)
        }

    }, [taskData])

    const hideModal = (e) => {

        if (e.target.classList.contains('task-modal')) {

            document.getElementById('edit-task-modal').style.display = 'none'

        }
    } 

    const deleteTask = () => {

        if (window.confirm('Are you sure you want to delete this subtask?')) {
            console.log('delete');
        }
    }

    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            {!taskData ? <Message variant='danger'> No task data</Message>
            : 
                <div className="open-task-card mx-auto">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2 className="modal-task-title">Edit Task</h2>
                        
                    </div>

                    <form id='edit-task'>

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Title</label>
                            <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                        </div>

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="description">Description</label>
                            <textarea type="text" value={taskDescription}
                             onChange={(e) => setTaskDescription(e.target.value)}
                             placeholder="e.g.  It's always good to take a break. This 15 
                                minute break will recharge the batteries a little."
                             />
                        </div>

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="subtasks">Subtasks</label>

                            {taskData[1].map(subtask => (
                                <div key={subtask.id} className='subtask-input'>
                                    <input type="text" placeholder={subtask.title} disabled/>
                                    <svg onClick={() => deleteTask(subtask.id)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                </div>
                            ))}
                           
                           <button className='btn-secondary'>+ Add New Subtask</button>
                        </div>
                        
                        <p className="subtask-title mt-3">Status</p>

                        <div className='task-status'>
                            <p>{success ? taskUpdate.status : taskData[0].status}</p>
                        </div>

                        <button type='submit' className='btn-primary-s'>Save Changes</button>
                    </form>
   
                </div>
            }

        </div>
    )
}

export default EditTask
