import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteTask } from '../actions/taskActions'
import { deleteBoard } from '../actions/boardActions'
import Spinner from '../Components/Spinner'
import Message from '../Components/Message'

const DeleteConfirm = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id, taskID } = useParams()

    const taskList = useSelector(state => state.taskList)
    const { task } = taskList

    const boardList = useSelector(state => state.boardList)
    const { board } = boardList

    const deletedBoard = useSelector(state => state.deletedBoard)
    const { loading, error, success: deletedSuccess } = deletedBoard

    const deletedTask = useSelector(state => state.deletedTask)
    const { loading:deleteLoading, error:deleteError, success:deleteTaskSuccess } = deletedTask


    useEffect(() => {

        if (deletedSuccess) {
            navigate('/')
        }

        if (deleteTaskSuccess) {
            navigate(`/board/${id}`)
        }

    }, [navigate, id, deletedSuccess, deleteTaskSuccess])


    const hideModal = (e) => {

        if (!loading && !deleteLoading) {

            if (e.target.classList.contains('task-modal')) {
                navigate(-1)
            }
        }
    }

    const handleDelete = () => {
        if (taskID) {
            dispatch(deleteTask(taskID))

        } else if (id) {
            dispatch(deleteBoard(id))
           
        }
    }

    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>

            <div className="open-task-card mx-auto">

            {loading || deleteLoading ? <Spinner /> 
            : error || deleteError ? <Message>{error ? error : deleteError && deleteError}</Message> : (
                <>
                 <div>
                     <h2 className="delete-text">
                        {taskID ? 'Delete this task?' : 'Delete this board?'}
                        </h2>
                </div>

                <p className='modal-task-description'>
                    {taskID ? `Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action cannot be reversed.` 
                     : board && board.length > 0 && `Are you sure you want to delete the ‘${board[0].board.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
                    </p>
                 
                 <div className='delete-modal d-flex justify-content-between mt-3'>
                    <button onClick={() => handleDelete()} className='btn-destructive'>Delete</button>
                    <button onClick={() => navigate(-1)} className='btn-secondary'>Cancel</button>
                 </div>

                </>
            )}

            </div>

        </div>
    )
}

export default DeleteConfirm
