import { useNavigate } from 'react-router-dom';
import ItemList from '../itemList/itemList';
import GotService from '../../services/gotService';

const CharactersPage = () => {
    const gotService = new GotService();
    const navigate = useNavigate();

    const handleItemSelected = (itemId) => {
        navigate(itemId);
    };

    return (
        <ItemList
            onItemSelected={handleItemSelected}
            getData={gotService.getAllCharacters}
            renderItem={({ name }) => name}
        />
    );
};

export default CharactersPage;
