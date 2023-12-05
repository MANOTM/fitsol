import { useEffect, useState } from 'react'
import DesktopHeader from './components/DesktopHeader'
import SearchDesktop from './components/SearchDesktop'
import './header.css'
import { AnimatePresence } from 'framer-motion'
import Login from '../login/Login'
import MobileHeader from './components/MobileHeader'
import HeaderPopup from './components/HeaderPopup'
import Bag from './components/Bag'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function Header() {
  const [SearchShow, setSearchShow] = useState(false)
  const [ShowLogin, setShowLogin] = useState(false)
  const [ShowHeaderPopup, setShowHeaderPopup] = useState(0)
  const [OpenBag, setOpenBag] = useState(0)

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const path=useLocation() 

  useEffect(() => {
    const handleScroll = () => {
      setPrevScrollPos(window.pageYOffset)
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <>
      <motion.div className={`header ${prevScrollPos > 200 || path.pathname!='/' ? 'active' :''}`} initial={{opacity:0}} animate={{opacity:1,transition:{duration:.5 ,delay:.5}}} >
        <DesktopHeader setSearchShow={setSearchShow} SearchShow={SearchShow} setShowLogin={setShowLogin} setOpenBag={setOpenBag} />
        <MobileHeader setSearchShow={setSearchShow} SearchShow={SearchShow} setShowHeaderPopup={setShowHeaderPopup} ShowHeaderPopup={ShowHeaderPopup} setOpenBag={setOpenBag} />
      </motion.div>
      <AnimatePresence>
        {SearchShow && <SearchDesktop setSearchShow={setSearchShow} />}
        {ShowLogin && <Login setShowLogin={setShowLogin} />}
        {ShowHeaderPopup && <HeaderPopup setShowHeaderPopup={setShowHeaderPopup} />}
        {OpenBag && <Bag setOpenBag={setOpenBag} />}
      </AnimatePresence>
    </>
  )
}
