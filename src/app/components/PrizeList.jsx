"use client"
import React from 'react'

const PrizeList = ({prizes}) => {
  return (
    <div className="prize-list">
        {
          prizes.sort((a, b) => b.chance - a.chance).map((prize) => {
            const rarity = prize.chance == 0.12
            ? "common"
            : prize.chance == 0.1 || prize.chance == 0.08 || prize.chance == 0.09
            ? "rare"
            : prize.chance == 0.04
            ? "mythical"
            : prize.chance == 0.03 
            ? "legendary"
            : prize.chance <= 0.015
            ? "immortal" : ''

            return (
            <div className={`prize ${rarity}`} key={prize.name}>
              <p>{prize.name}</p>
            </div>
            )
          })
        }
    </div>
  )
}

export default PrizeList