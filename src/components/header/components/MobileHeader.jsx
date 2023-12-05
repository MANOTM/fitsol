import React from 'react'
import { Logo } from '../../../icons/Logo'
import { Link } from 'react-router-dom'
import { Menu } from '../../../icons/Menu'
import { useSelector } from 'react-redux'

export default function MobileHeader({ SearchShow, setSearchShow ,setShowHeaderPopup,setOpenBag}) {
  
  const {bagLenght}  = useSelector(state => state.bag) 
  return (
    <div className={`mobile-header small-text ${SearchShow && 'active'}`}>
      <Link to='/' className="logo">
        <Logo />
      </Link>
      <div className="desktop-item search-btn" onClick={() => setSearchShow(true)}>
        Search
      </div>
      <div className="flex">
        <p className="desktop-item" onClick={()=>setOpenBag(1)}>Bag {bagLenght ? `[${bagLenght}]`:''}</p>
        <p className="desktop-item" onClick={()=>setShowHeaderPopup(1)}>{<Menu/>}</p>
      </div>
    </div>
  )
}
