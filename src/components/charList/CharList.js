import { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './charList.scss';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        // this.marvelService
        //     .getAllCharacters()
        //         .then(res => {
        //             this.setState({
        //                 ...this.state,
        //                 charList: res
        //             });
        //         })
        //
        //     .then(this.onCharListLoaded)
        //     .catch(this.onError)

        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            // .then(res => {
            //     this.setState({
            //         ...this.state,
            //         charList: res
            //     });
            // })
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList : [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const { charList, error, loading, newItemLoading, offset, charEnded } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    <LoadedCharacters charList={charList} selectedCharId={this.props.selectedCharId} onCharSelected={this.props.onCharSelected} />
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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
                <li key={character.id}
                    tabIndex={0}
                    className={`char__item ${selectedCharId === character.id && 'char__item_selected'}`}
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
