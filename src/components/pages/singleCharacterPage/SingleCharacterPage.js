import { useParams } from "react-router-dom";
import useMarvelService from "../../../services/MarvelService";
import { useEffect, useState } from "react";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import Spinner from "../../spinner/Spinner";
import './singleCharacterPage.scss'
import { Helmet } from "react-helmet";

export default function SingleCharacterPage (){
    const { charId } = useParams();
    const [char, setChar] = useState(null);
    const { loading, error, clearError, getCharacter } = useMarvelService();

    useEffect(() => {
        if (charId) {
            updateChar();
        }
    },[charId])

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .catch(error => console.log(error))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ char }) => {
    const { title, description, thumbnail, } = char

    return (
        <div className="single-char">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} page`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{title}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </div>
    )
}

