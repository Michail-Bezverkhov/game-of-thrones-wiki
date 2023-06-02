import { Component } from 'react';
import './randomChar.sass';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar();
    }

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });

    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,

        })
    }

    updateChar() {
        const id = Math.floor(Math.random() * 140 + 25);


        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {

        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;

        const spinner = loading ? <Spinner /> : null;

        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}


const View = ({ char }) => {

    let { name, gender, born, died, culture } = char;

    name = name || 'No data';
    gender = gender || 'No data';
    born = born || 'No data';
    died = died || 'No data';
    culture = culture || 'No data';

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}