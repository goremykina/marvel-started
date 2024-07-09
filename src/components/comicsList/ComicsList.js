import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import './comicsList.scss';
import { Link } from "react-router-dom";

const ComicsList = () => {
    const [offset, setOffset] = useState(200);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsList, setComicsList] = useState([]);
    const [comicsEnded, setComicsEnded] = useState(false);
    const { loading, error, getAllComics } =  useMarvelService();

    useEffect(() => {
        onRequest(offset)
    }, [])

    const onRequest = (offset) => {
        setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8)
        setNewItemLoading(false)
        setComicsEnded(ended)

    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">
                <LoadedComics comicsList={comicsList} />
            </ul>
            <button
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const LoadedComics = ({ comicsList }) => {
    return (
        <>
            {comicsList.map((comic, index) => (
                <li
                    className="comics__item"
                    key={comic.id}>
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
                ))
            }
        </>
    )
}

export default ComicsList;
