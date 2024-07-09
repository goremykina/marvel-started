import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import decoration from '../../../resources/img/vision.png';
import { useState } from "react";
import CharSearchForm from "../../charSearchForm/CharSearchForm";
import { Helmet } from "react-helmet";

const MainPage = () => {
    const [selectedCharId, setSelectedCharId] = useState(null)

    const onCharSelected = (id) => {
        setSelectedCharId(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
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
