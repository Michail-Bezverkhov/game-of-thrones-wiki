import React, { Component } from 'react';
import './itemDetails.sass';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span className="term-descr">{item[field]}</span>
        </li>
    )
}

export { Field };

export default class itemDetails extends Component {

    gotService = new GotService();

    state = {
        item: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    async updateItem() {
        const { itemId } = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        });

        const { getItemData } = this.props;

        await getItemData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false
                })
            })
    }

    render() {

        const { error, item, loading } = this.state;

        if (error) {
            return <ErrorMessage />
        }

        if (loading) {
            return <Spinner />
        }

        if (!item) {
            return <span className='item-request'> Please select an item </span>
        }

        const { name } = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { item })
                        })
                    }
                </ul>
            </div>
        );
    }
}