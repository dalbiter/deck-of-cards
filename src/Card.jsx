import React, { useState, useEffect } from 'react';

const Card = ({ value, suit, img }) => {
    return (
        <span>
            <img src={img} alt="" />
        </span>
    );
};

export default Card;