import { useHttp } from "../hooks/http.hook";

const useMarvelService = () =>  {
    const { loading, request, error, clearError, process, setProcess } = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=bdc6f7d7b9f5a503965416af9c960a38';
    const _baseOffset = 200;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey} `)
        console.log(res)
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        console.log(id)
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        if (!char) {
            return null;
        }

        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            noThumbnail: char.thumbnail.path.includes('image_not_available'),
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
            pageCount: comics.pageCount
                ? `${comics.pageCount} page.`
                : "No information about the number of pages",
            language: comics.textObjects[0]?.language || "en-us"
        }
    }

    return { loading,
        error,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getComic,
        getCharacterByName,
        process,
        setProcess}
}

export default useMarvelService;
