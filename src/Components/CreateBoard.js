import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBoard } from '../actions/boardActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'



const CreateBoard = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [boardTitle, setBoardTitle] = useState('')
    const [message, setMessage] = useState('')
    const columns = ['Todo', 'Doing', 'Done']
    
    const createdBoard = useSelector(state => state.createdBoard)
    const {loading, success, error, board} = createdBoard

    useEffect(() => {

        if (success) {
            dispatch({type: 'CREATE_BOARD_RESET'})
            navigate(`/board/${board.id}`)
        }

    }, [success, board, dispatch, navigate])


    const hideModal = (e) => {
        
        if (e.target.classList.contains('task-modal')) {
        navigate(`/`)
        }

    } 

    const handleSubmit = (e) => {
        e.preventDefault()

        if (boardTitle.length > 1) {
            
            dispatch(createBoard({"name": boardTitle, "columns": columns}))
            

        } else {
            setMessage('Please enter a board title')

        }
        
    } 


    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
                {message && <Message variant='danger'>{message}</Message>}
                <div>
                     <h2 className="modal-task-title">Add New Board</h2>
                </div>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                 : ( 
                    <form id='edit-task'>

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Name</label>
                            <input type="text" required value={ boardTitle } placeholder='e.g. Web Design'
                            onChange={(e) => setBoardTitle(e.target.value)}/>
                        </div>

                        <div className='form-group'>
                            <label className='subtask-title' htmlFor="subtasks">Columns</label>
                            
                            <div className='subtasks-container'> 
                            {columns.map((column, idx) => (
                                    <div key={idx} className='subtask-input'>
                                        <input className='subtask-input-field'
                                        type="text" id={idx} value={column} disabled/>
                                    </div>
                            
                                ))
                                }
                            </div>
                    
                        </div>
                        

                        <input type='submit' onClick={(e) => handleSubmit(e)} 
                        className='btn-primary-s' value={'Create New Board'}/>
                    </form>
                )}

            </div>

        </div>
    )
}

export default CreateBoard
