import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const CardWrapper = () => {
    const [deckId, setDeckId] = useState()
    const [drawnCards, setDrawnCards] = useState([])
    const drawCard =  async (deckId) => {
        const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
        setDrawnCards([...drawnCards, {key: card.data.cards[0].code, value: card.data.cards[0].value, suit: card.data.cards[0].suit}])
    }
    useEffect(() => {
        const loadDeck = async () => {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            setDeckId(res.data.deck_id)
        };
        loadDeck();
    }, [])
    return (
        <div>
            <button onClick={() => drawCard(deckId)}>Draw Card</button>
            {drawnCards.map(({ key, value, suit }) => (
                <Card key ={key} value={value} suit={suit} />
            ))}
        </div>
    );
};

export default CardWrapper;