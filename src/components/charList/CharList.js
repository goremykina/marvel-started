import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } =  useMarvelService();

    useEffect(() => {
        onRequest(offset)
    }, [])

    const onRequest = (offset) => {
        setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    console.log('charlist')

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">
                <LoadedCharacters charList={charList} selectedCharId={props.selectedCharId} onCharSelected={props.onCharSelected} />
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const LoadedCharacters = ({ charList, selectedCharId, onCharSelected }) => {
    const handleClick = (id) => {
        onCharSelected(id);
    }
    const handleKeyDown = (id, event) => {
        if (event.key === 'Enter') {
            onCharSelected(id);
        }
    }

    return (
        <>
            {charList.map(character => (
                <li
                    key={character.id}
                    tabIndex={0}
                    className={`char__item ${selectedCharId === character.id ? 'char__item_selected' : ''}`}
                    onClick={() => handleClick(character.id)}
                    onKeyDown={(event) => handleKeyDown(character.id, event)}>>
                    <img src={character.thumbnail} style={{objectFit: 'unset'}} alt="abyss"/>
                    <div className="char__name">{character.name}</div>
                </li>
            ))}
        </>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
    selectedCharId: PropTypes.number
}

export default CharList;
