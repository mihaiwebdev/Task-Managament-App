import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../actions/userActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const RegisterModal = ( ) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {

        if (userInfo) {
            navigate('/')
            window.location.reload()
        }

    }, [userInfo, navigate])

    const hideModal = (e) => {
        if (e.target.classList.contains('task-modal')) {
            navigate('/')
            }
    }

  
    const handleSubmit = (e) =>  {
        e.preventDefault()

        if (password !== confPassword) {
            setMessage('Paswords do not match')

        } else {

            dispatch(registerUser({
                'username': username,
                'email': email,
                'password': password,
            }))
        }
    }

    return (
        <div id='edit-task-modal' className='task-modal' onClick={(e) => hideModal(e)}>
            
            <div className="open-task-card mx-auto">
                {error ? <Message variant='danger'>{error}</Message>
                 : message && <Message variant='danger'>{message}</Message>}
                {loading && <Loader />}

                <div>
                    <h2 className="modal-task-title">Register</h2>
                </div>

                <form id='register' onSubmit={handleSubmit}>

                    <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Username</label>
                            <input type="text" value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Email</label>
                            <input type="text" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Password</label>
                            <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className='form-group'>
                            <label className='subtask-title' htmlFor="title">Confirm Password</label>
                            <input type="password" value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}/>
                    </div>

                    <input type='submit' className='btn-primary-s mt-2 w-100' value='Register'/>
                </form>

                <p className='mt-3 subtask-title'>Already have an account? <Link to='/login'>Log In</Link></p>

            </div>

        </div>
    )
}

export default RegisterModal
