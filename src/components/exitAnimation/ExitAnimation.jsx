import { useState } from 'react'
import Header from '../header/Header' 
import { motion } from 'framer-motion'

export default function ExitAnimation({ children }) {
  const [Anim,setAnim]=useState(false)
  const end=()=>{
    setAnim(true)
  }
  return (
    <motion.div>
      <Header/>
      {children}
      <motion.div className='exit' initial={{opacity:0 , zIndex:-1}} exit={{opacity:1,zIndex:9999}} transition={{duration:.5}}></motion.div>
      <motion.div className='exit' style={Anim?{zIndex:-1}:{zIndex:1}} initial={{opacity:1}} animate={{opacity:0}} transition={{duration:.5,ease:[0.12, 0, 0.39, 0],delay:.5}} onAnimationComplete={end}></motion.div>
    </motion.div>
  )
}
