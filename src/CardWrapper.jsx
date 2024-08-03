import React, { useState } from 'react';
import Card from './Card';
import axios from 'axios';

const CardWrapper = () => {
    const [card, setCard] = useState({
        value: 'ace',
        suit: 'spades'
    })
    return (
        <div>
            <button>Draw Card</button>
            <Card value={card.value} suit={card.suit} />
        </div>
    );
};

export default CardWrapper;