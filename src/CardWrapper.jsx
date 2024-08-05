import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const CardWrapper = () => {
    const [deckId, setDeckId] = useState();
    const [drawnCards, setDrawnCards] = useState([]);
    const [startDraw, setStartDraw] = useState(false);
    const drawCard =  async (deckId) => {
        try {
            console.log(deckId)
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
            setDrawnCards([...drawnCards, {key: res.data.cards[0].code, value: res.data.cards[0].value, suit: res.data.cards[0].suit}])
        } catch {
            alert("Error: No cards remaining!")
        }
        
    };

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
    }, []);

    useEffect(() => {
        let intervalId = null;
        console.log(startDraw)
        if(!setStartDraw) {
            intervalId = setInterval(() => {
                console.log("I am in the interval")
                drawCard(deckId)
            }, 1000)
        } else {
            clearInterval(intervalId)
        }

    }, [setStartDraw]);

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