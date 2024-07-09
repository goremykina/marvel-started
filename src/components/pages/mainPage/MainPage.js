import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import decoration from '../../../resources/img/vision.png';
import { useState } from "react";
import CharSearchForm from "../../charSearchForm/CharSearchForm";

const MainPage = () => {
    const [selectedCharId, setSelectedCharId] = useState(null)

    const onCharSelected = (id) => {
        setSelectedCharId(id);
    }

    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList selectedCharId={selectedCharId} onCharSelected={onCharSelected}/>
                <div>
                    <CharInfo charId={selectedCharId}/>
                    <CharSearchForm />
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;
