import './errorMessage.sass';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img className='error-img' src={img} alt='error'></img>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;