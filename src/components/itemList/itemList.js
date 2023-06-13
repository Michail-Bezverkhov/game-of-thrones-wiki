import { Component } from 'react';
import Spinner from '../spinner/spinner';
import './itemList.sass';
import ErrorMessage from '../errorMessage/errorMessage';

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {

        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    <span>{label}</span>
                    <span
                        className="prompt">
                        Click to select
                    </span>
                </li>
            )
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const { itemList } = this.state;

        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}