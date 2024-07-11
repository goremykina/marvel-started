import { useParams } from "react-router-dom";
import useMarvelService from "../../../services/MarvelService";
import { useEffect, useState } from "react";
import './singleCharacterPage.scss'
import { Helmet } from "react-helmet";
import setContent from "../../../utils/setContent";
import AppBanner from "../../appBanner/AppBanner";

export default function SingleCharacterPage (){
    const { charId } = useParams();
    const [char, setChar] = useState(null);
    const { clearError, getCharacter, process, setProcess } = useMarvelService();

    useEffect(() => {
        if (charId) {
            updateChar();
        }
    },[charId])

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            .catch(error => console.log(error))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({ data }) => {
    const { title, description, thumbnail, } = data

    return (
        <>
            <AppBanner />
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
        </>
    )
}

