import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet01.png" , matched : false},
  { "src": "/img/ring1.png"    , matched : false},
  { "src": "/img/scroll1.png"  , matched : false},
  { "src": "/img/shield1.png"  , matched : false},
  { "src": "/img/sword1.png"   , matched : false},
  { "src": "/img/potion.png"   , matched : false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
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
