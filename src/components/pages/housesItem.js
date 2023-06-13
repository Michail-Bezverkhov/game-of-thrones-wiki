import { useParams } from 'react-router-dom';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import GotService from '../../services/gotService';

const HousesItem = () => {
    const { itemId } = useParams();
    const gotService = new GotService();

    return (
        <ItemDetails itemId={itemId} getItemData={gotService.getHouse}>
            <Field field='region' label='Region' />
            <Field field='words' label='Words' />
            <Field field='titles' label='Titles' />
            <Field field='ancestralWeapons' label='Ancestral weapons' />
        </ItemDetails>
    );
};

export default HousesItem;
