import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// images

import helmet from './img/helmet.png';
import ring from './img/ring.png';
import scroll from './img/scroll.png';
import shield from './img/shield.png';
import sword from './img/sword.png';
import potion from './img/potion.png';

const cardImages = [
  { src: helmet, matched: false },
  { src: ring, matched: false },
  { src: scroll, matched: false },
  { src: shield, matched: false },
  { src: sword, matched: false },
  { src: potion, matched: false }
];

function App() {
  const [cards, setCards] = useState([])
  const [setTurns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)


  const shuffleCard = () => {
    const shuffledCard = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCard)
    setTurns(0)

  }

  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
  }

  useEffect( () => {
    if( choiceOne && choiceTwo) {
      if( choiceOne.src === choiceTwo.src ) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if( card.src === choiceOne.src) {
              return {...card, matched : true }
            } else {
              return card
            }
          })
        })
        reserTurn()
      } else {
        setTimeout(() =>reserTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const reserTurn = () => {
    setchoiceOne(null)
    setchoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className='card-grid' >
        {cards.map(card => (
          <SingleCard 
          key={card.id}
           card={card} 
           handleChoice = {handleChoice}
           flipped = {card === choiceOne || card === choiceTwo || card.matched}
           />
        ))}
      </div>
    </div>
  );
}

export default App;
