import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

export default function setContent (process, Component, data) {
    console.log(data);
    switch (process) {
        case 'waiting' :
            return <Skeleton />
        case 'loading' :
            return <Spinner />
        case 'confirmed' :
            return <Component data={data} />;
        case 'error' :
            return <ErrorMessage />
        default:
            throw new Error('unexpected process state');
    }
}
