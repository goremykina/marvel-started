import error from "./error.gif"
import './error.scss'

const ErrorMessage = () => {
    return (
        <img className='img_error' src={error} alt="Error Message" />
    )
}

export default ErrorMessage
