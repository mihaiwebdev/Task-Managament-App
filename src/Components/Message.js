import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
    return (
        <Alert className='alert-message' variant={variant}>
            {children}
        </Alert>
    )
}

export default Message