import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import axios from 'axios';

const BASE_URL = "https://deckofcardsapi.com/api/deck"

const CardWrapper = () => {
    const [deckId, setDeckId] = useState();
    const [drawnCards, setDrawnCards] = useState([]);
    const [startDraw, setStartDraw] = useState(false);
    const intervalRef = useRef(null);
    const drawCard =  async (deckId) => {
        try {
            const res = await axios.get(`${BASE_URL}/${deckId}/draw/`)
            setDrawnCards([...drawnCards, {key: res.data.cards[0].code, value: res.data.cards[0].value, suit: res.data.cards[0].suit}])

            if(res.data.remaining === 0) {
                setStartDraw(false)
                throw new Error("No cards remainig!")
            } 
        } catch(err) {
            alert(err)
        }
        
    };

    useEffect(() => {
        const loadDeck = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
             setDeckId(res.data.deck_id)
            } catch (err) {
                alert(err)
            }
        };
        loadDeck();
    }, []);

    useEffect(() => {
        if(startDraw && !intervalRef.current) {
            intervalRef.current = setInterval(async () => {
                 await drawCard(deckId)
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
            intervalRef.current = null;
        }

    }, [startDraw, setStartDraw, deckId]);

    return (
        <div>
            <button onClick={() => drawCard(deckId)}>Draw a Card</button>
            <button onClick={() => setStartDraw(true)}>Auto Draw</button>
            <button onClick={() => setStartDraw(false)}>Stop</button>
            {drawnCards.map(({ key, value, suit }) => (
                <Card key ={key} value={value} suit={suit} />
            ))}
        </div>
    );
};

export default CardWrapper;