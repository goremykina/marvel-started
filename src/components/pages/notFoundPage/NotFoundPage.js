import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import './notFoundPage.scss'
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
    return (
        <div className='not_found_wrapper'>
            <Helmet>
                <meta
                    name="description"
                    content="Not found"
                />
                <title>Page is not found</title>
            </Helmet>
            <ErrorMessage/>
            <p className='not_found'>Page doesn't exist</p>
            <Link to={'/'} className='not_found link'>Back to main page</Link>
        </div>
    )
}

export default NotFoundPage
