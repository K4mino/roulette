"use client"
import Link from 'next/link'

const SideMenu = ({close,isActive}) => {

  return (
    <div className={`side-menu ${isActive ? 'active' : ''}`}>
        <img className='arrow' src="/arrow.png" alt="arrow"  onClick={close}/>
        <Link className='side-menu-link' href='/admin'>Админка</Link>
        <div className='side-menu-content'>
        </div>
    </div>
  )
}

export default SideMenu