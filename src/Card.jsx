import React, { useState, useEffect } from 'react';

const Card = ({ value, suit }) => {
    return (
        <div>
            {`You drew the ${value} of ${suit}`}
        </div>
    );
};

export default Card;