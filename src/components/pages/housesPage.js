// import { Component } from 'react';
// import ItemList from '../itemList/itemList';
// import ItemDetails, {Field} from '../itemDetails/itemDetails';
// import ErrorMessage from '../errorMessage/errorMessage';
// import GotService from '../../services/gotService';
// import RowBlock from '../rowBlock/rowBlock';

// export default class HousesPage extends Component {

//     gotService = new GotService();

//     state = {
//         selectedItem: null,
//         error: false
//     }

//     onItemSelected = (id) => {
//         this.setState({
//             selectedItem: id
//         })
//     }

//     componentDidCatch() {
//         console.log('error');
//         this.setState({
//             error: true
//         })
//     }

//     render() {

//         if (this.state.error) {
//             return <ErrorMessage />
//         }

//         const itemList = (
//             <ItemList
//                 onItemSelected={this.onItemSelected}
//                 getData={this.gotService.getAllHouses}
//                 renderItem={({name}) => name}
//             />
//         )

//         const itemDetails = (
//             <ItemDetails
//             itemId={this.state.selectedItem}
//             getItemData={this.gotService.getHouse}>
//             <Field field='region' label='Region' />
//             <Field field='words' label='Words' />
//             <Field field='titles' label='Titles' />
//             <Field field='ancestralWeapons' label='Ancestral weapons' />
//             </ItemDetails >
//         )

//         return (
//             <RowBlock
//                 left={itemList}
//                 right={itemDetails}
//             />
//         )
//     }
// }

import { useNavigate } from 'react-router-dom';
import ItemList from '../itemList/itemList';
import GotService from '../../services/gotService';

const HousesPage = () => {
    const gotService = new GotService();
    const navigate = useNavigate();

    const handleItemSelected = (itemId) => {
        navigate(itemId);
    };

    return (
        <ItemList
            onItemSelected={handleItemSelected}
            getData={gotService.getAllHouses}
            renderItem={({ name }) => name}
        />
    );
};

export default HousesPage;
