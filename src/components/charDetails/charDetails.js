import React, { Component } from 'react';
import './charDetails.sass';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const Field = ({ char, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {Field};

export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        char: null,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    updateChar() {
        const { charId } = this.props;
        if (!charId) {
            return
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({ char })
            })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        if (!this.state.char) {
            return <Spinner />
        }

        const {char} = this.state;

        const {name} = char;


        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </div>
        );
    }
}