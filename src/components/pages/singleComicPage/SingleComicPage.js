import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../../services/MarvelService";
import './singleComicPage.scss';
import { Helmet } from "react-helmet";
import setContent from "../../../utils/setContent";
import AppBanner from "../../appBanner/AppBanner";

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);

    const { clearError, getComic, process, setProcess } = useMarvelService();

    useEffect(() => {
        if (comicId) {
            updateComic();
        }
    },[comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'))
            .catch(error => console.log(error))
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({ data }) => {
    const { title, description, price, thumbnail, pageCount, language } = data

    return (
        <>
            <AppBanner/>
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${title} comics book`}
                    />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to={'/comics'} className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicPage;
