import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import './charInfo.scss';

const CharInfo = (props) =>  {
    const [char, setChar] = useState(null);

    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    },[props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

// Вместо этого теперь ф-ция setContent, которая отображает контент в зависимости от того, что сейчас нужно (загружено)
    // const skeleton = char || loading || error ? null : <Skeleton />
    // const errorMessage = error ? <ErrorMessage /> : null
    // const spinner = loading ? <Spinner /> : null
    // const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: 'contain'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics :(' }
                {
                    comics.map((item, index) => {
                        while (index < 10 ) {
                             return (
                                <li key={index} className="char__comics-item">
                                    {item.name}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
