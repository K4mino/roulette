import React from 'react'

const Burger = ({onClick}) => {
  return (
    <div className='burger' onClick={onClick}>
        <span className='line'></span>
        <span className='line'></span>
        <span className='line'></span>
    </div>
  )
}

export default Burger