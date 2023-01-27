import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../actions/userActions'
import Message from '../Components/Message'
import Spinner from '../Components/Spinner'

const LoginModal = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('TestingUser')
    const [password, setPassword] = useState('123456')

    const userLogin = useSelector(state => state.userLogin) 
    const { loading, error, userInfo} = userLogin

    useEffect(() => {

        if (userInfo && userInfo.id) {
            navigate('/')
        }
        
    }, [navigate, userInfo])


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(loginUser(username, password))
    }

    return (
        <div id='edit-task-modal' className='task-modal'>
            
            <div className="open-task-card mx-auto">
                
                {loading ? < Spinner /> : error && <Message variant='danger'>{error}</Message>}

                <div>
                    <h2 className="modal-task-title">Log In</h2>
                </div>

                <form id='login' onSubmit={handleSubmit}>
                    <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Username</label>
                            <input type="text" value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Password</label>
                            <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <input type='submit' className='btn-primary-s mt-2 w-100' value='Log In'/>
                </form>
                <p className='mt-3 subtask-title'>Don't have an account? <Link to='/register'>Register</Link></p>

            </div>

        </div>
    )
}

export default LoginModal
