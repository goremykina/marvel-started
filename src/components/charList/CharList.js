import './charList.scss';
import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(res => {
                this.setState({
                    ...this.state,
                    characters: res
                });
            })
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const { characters, error, loading } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {characters.map(character => (
                        <li key={character.id} className="char__item" onClick={() => this.props.onCharSelected(character.id)}>
                            <img src={character.thumbnail} style={{objectFit: 'unset'}} alt="abyss"/>
                            <div className="char__name">{character.name}</div>
                        </li>
                    ))}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
