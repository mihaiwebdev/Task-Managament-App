import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteTask } from '../actions/taskActions'
import { deleteBoard } from '../actions/boardActions'



const DeleteConfirm = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id, taskID } = useParams()

    const taskList = useSelector(state => state.taskList)
    const { task } = taskList

    const boardList = useSelector(state => state.boardList)
    const { board } = boardList

    const hideModal = (e) => {
        if (e.target.classList.contains('task-modal')) {
            navigate(-1)
            }
    }

    const handleDelete = () => {
        if (taskID) {
            dispatch(deleteTask(taskID))
            navigate(`/board/${id}`)

        } else if (id) {
            dispatch(deleteBoard(id))
            navigate('/')
        }
    }

    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
                <div>
                     <h2 className="delete-text">
                        {taskID ? 'Delete this task?' : 'Delete this board?'}
                        </h2>
                </div>

                <p className='modal-task-description'>
                    {taskID ? `Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action cannot be reversed.` 
                     : `Are you sure you want to delete the ‘${board[0].board.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
                    </p>
                 
                 <div className='delete-modal d-flex justify-content-between mt-3'>
                    <button onClick={() => handleDelete()} className='btn-destructive'>Delete</button>
                    <button onClick={() => navigate(-1)} className='btn-secondary'>Cancel</button>
                 </div>

            </div>

        </div>
    )
}

export default DeleteConfirm
