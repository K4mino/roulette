import React from 'react'

const RouletteItem = ({rarity,text,isLoser}) => {
  return (
    <div className='roulette-item'>
        <div style={{ opacity: isLoser ? 0.5 : 1 }} className={`roulette-item-inner ${rarity}`}>
            <div className='roulette-item-text'>
                {text}
            </div>
        </div>
    </div>
  )
}

export default RouletteItem