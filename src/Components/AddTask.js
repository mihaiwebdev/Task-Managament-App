import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask } from '../actions/taskActions'
import Message from '../Components/Message'



const AddTask = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [message, setMessage] = useState('')
    const [subtasks, setSubtasks] = useState(['subtask', 'subtask'])

    const hideModal = (e) => {
        
        if (e.target.classList.contains('task-modal')) {
        navigate(`/board/${id}`)
        }

    } 
 
    const addNewSubtask = (e) => {
        e.preventDefault()
        setSubtasks([...subtasks, 'subtask'])
    }

    const deleteSubtask = (idx) => {

        if (window.confirm('Are you sure you want to delete this subtask?')) {

            setSubtasks(subtasks.filter((subtask, index) => index !== idx ))

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let subtasksTitle = []

        if (taskTitle.length > 1) {
   
            const subtasksInputs = document.querySelectorAll('.subtask-input-field')
            
            subtasksInputs.forEach(input => {
                
                subtasksTitle.push({     
                    "title": input.value, 
                })
                
            }) 
            
            const status = document.getElementById('select-status').value
            
            dispatch(createTask({
                "boardID": id,
                "title": taskTitle,
                "description": taskDescription,
                "subtasks": subtasksTitle,
                "status": status,
            }))
            
            navigate(`/board/${id}/`)

        } else {
            setMessage('Please enter a task title')

        }
        
    } 


    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
                {message && <Message variant='danger'>{message}</Message>}
                <div>
                     <h2 className="modal-task-title">Add New Task</h2>
                </div>

                <form id='edit-task'>

                    <div className='form-group'>
                        <label className='subtask-title' htmlFor="title">Title</label>
                        <input type="text" value={ taskTitle } placeholder='e.g. Take coffe break'
                         onChange={(e) => setTaskTitle(e.target.value)}/>
                    </div>

                    <div className='form-group'>
                        <label className='subtask-title' htmlFor="description">Description</label>
                        <textarea type="text" value={ taskDescription }
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="e.g.  It's always good to take a break. This 15 
                            minute break will recharge the batteries a little."
                            />
                    </div>

                    <div className='form-group'>
                        <label className='subtask-title' htmlFor="subtasks">Subtasks</label>
                        
                        <div className='subtasks-container'> 
                          {subtasks.map((subtask, idx) => (
                                <div key={idx} className='subtask-input'>
                                    <input className='subtask-input-field'
                                     type="text" id={idx} />
                                    <svg onClick={() => deleteSubtask(idx)} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                </div>
                        
                              ))
                            }
                        </div>
                        <button className='btn-secondary' onClick={(e) => addNewSubtask(e)} >+ Add New Subtask</button>
                    </div>
                    
                    <p className="subtask-title mt-3">Status</p>

                    <select id='select-status' className='task-status'>
                        <option value="Todo">Todo</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>

                    <input type='submit' onClick={(e) => handleSubmit(e)} 
                     className='btn-primary-s' value={'Create Task'}/>
                </form>

              

            </div>

        </div>
    )
}

export default AddTask
