export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    getAllHouses = async () => {
        const res = await this.getResource('/houses');
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
       const house = await this.getResource(`/houses/${id}`);
       return this._transformHouse(house);
    }
    getAllBooks = async () => {
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    _transformCharacter = (char) => {

        const id = char.url.match(/\/characters\/(\d+)/)[1];

        return {
            id: id,
            name: char.name || 'no data',
            gender: char.gender || 'no data',
            born: char.born || 'no data',
            died: char.died || 'no data',
            culture: char.culture || 'no data'
        }
    }

    _transformHouse = (house) =>{

        const id = house.url.match(/\/houses\/(\d+)/)[1];

        return {
            id: id,
            name: house.name || 'no data',
            region: house.region || 'no data',
            words: house.words || 'no data',
            titles: house.titles[0] || 'no data',
            overlord: house.overlord || 'no data',
            ancestralWeapons: house.ancestralWeapons[0] || 'no data',
        }
    }

    _transformBook = (book) => {

        const id = book.url.match(/\/books\/(\d+)/)[1];

        return {
            id: id,
            name: book.name || 'no data',
            numberOfPages: book.numberOfPages || 'no data',
            publisher: book.publisher || 'no data',
            released: book.released.match(/^(\d{4}-\d{2}-\d{2})/)[1] || 'no data'
        }
    }
}