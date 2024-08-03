import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const CardWrapper = () => {
    const [deckId, setDeckId] = useState()
    const [drawnCards, setDrawnCards] = useState([])
    const drawCard =  async (deckId) => {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
            setDrawnCards([...drawnCards, {key: res.data.cards[0].code, value: res.data.cards[0].value, suit: res.data.cards[0].suit}])
        } catch {
            alert("Error: No cards remaining!")
        }
        
    }
    useEffect(() => {
        const loadDeck = async () => {
            try {
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
             setDeckId(res.data.deck_id)
            } catch {
                alert("Not Found")
            }
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