import React from 'react'
import './SingleCard.css'
import cover from '../img/cover.jpeg';

export default function SingleCard({ card , handleChoice, flipped }) {

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className='card'>
            <div className={ flipped ? 'flipped' : ''}>
                <img className='front' src={card.src} alt='card front' />
                <img 
                    className='back'
                    src={cover}
                    alt='card back' 
                    onClick={handleClick} 
                />
            </div>
        </div>
    )
}
