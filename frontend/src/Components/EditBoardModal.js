import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editBoard } from '../actions/boardActions'
import Message from '../Components/Message'
import Spinner from '../Components/Spinner'

const EditBoardModal = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const [boardTitle, setBoardTitle] = useState('')
    const [message, setMessage] = useState('')

    const boardList = useSelector(state => state.boardList)
    const { board } = boardList

    const editedBoard = useSelector(state => state.editedBoard)
    const { loading, error, board:boardEdit } = editedBoard

    useEffect(() => {

        if (board && board.length > 0) {

            if (boardEdit && boardEdit.id === board[0].board.id) {
                setBoardTitle(boardEdit.name)

            } else {
                setBoardTitle(board[0].board.name)
            }
        } 


    }, [board, boardEdit])

    const hideModal = (e) => {
        if (e.target.classList.contains('task-modal') && !loading) {
            navigate(-1)
            }
    }

    const saveChanges = () => {
        if (id) {
            if (boardTitle.length > 1){

                dispatch(editBoard(id, boardTitle))
                navigate(-1)

            } else {
                setMessage('Board Name can"t be empty')
            }
        }
    }

    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
                <div>
                    <h2 className="modal-task-title">Edit Board</h2>
                </div>
                {message && <Message variant='danger'>{message}</Message>}
                { loading ? <Spinner /> : error ? <Message variant='danger'>{error}</Message>
                : (<>
                    <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Board Name</label>
                            <input type="text" value={boardTitle}
                                onChange={(e) => setBoardTitle(e.target.value)}/>
                    </div>

                    <button onClick={saveChanges} className='btn-primary-s'>Save Changes</button>
                </>)}
            </div>

        </div>
    )
}

export default EditBoardModal
