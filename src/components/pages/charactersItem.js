import { useParams } from 'react-router-dom';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import GotService from '../../services/gotService';

const CharactersItem = () => {
    const { itemId } = useParams();
    const gotService = new GotService();

    return (
        <ItemDetails itemId={itemId} getItemData={gotService.getCharacter}>
            <Field field='gender' label='Gender' />
            <Field field='born' label='Born' />
            <Field field='died' label='Died' />
            <Field field='culture' label='Culture' />
        </ItemDetails>
    );
};

export default CharactersItem;
