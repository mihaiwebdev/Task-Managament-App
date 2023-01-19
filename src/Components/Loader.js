import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation='border' rolo='status'
            style={{
                height:'100px',
                width:'100px',
                margin:'auto',
                display:'block'
            }}>
        
        </Spinner>
    )
}



export default Loader