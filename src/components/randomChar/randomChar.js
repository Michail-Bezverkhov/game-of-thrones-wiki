import React, { useState, useEffect } from 'react';
import './randomChar.sass';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import ItemDetails, { Field } from '../itemDetails/itemDetails';

const RandomChar = ({ interval }) => {

    const gotService = new GotService();
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onItemLoaded = (item) => {
        setItem(item);
        setLoading(false);
    };

    const onError = (error) => {
        console.log(error);
        setError(true);
        setLoading(false);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);

        gotService
            .getCharacter(id)
            .then(onItemLoaded)
            .catch(onError);
    }

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, interval);

        return () => {
            clearInterval(timerId);
        };
    }, [])

    const itemDetails = (
        <ItemDetails
            itemId={item.id}
            getItemData={gotService.getCharacter}>
            <Field field='gender' label='Gender' />
            <Field field='born' label='Born' />
            <Field field='died' label='Died' />
            <Field field='culture' label='Culture' />
        </ItemDetails >
    )

    const errorMessage = error ? <ErrorMessage /> : null;

    const spinner = loading ? <Spinner /> : null;

    const content = !(loading || error) ? itemDetails : null;

    return (
        <>
            {errorMessage}
            <h3 className='randomchar-header'>Random Character:</h3>
            {spinner}
            {content}
        </>
    );
};

export default RandomChar;