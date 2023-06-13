import { useParams } from 'react-router-dom';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import GotService from '../../services/gotService';

const BooksItem = () => {
  const { itemId } = useParams();
  const gotService = new GotService();

  return (
    <ItemDetails itemId={itemId} getItemData={gotService.getBook}>
      <Field field='numberOfPages' label='Number of pages' />
      <Field field='publisher' label='Publisher' />
      <Field field='released' label='Released' />
    </ItemDetails>
  );
};

export default BooksItem;
