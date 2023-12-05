import { motion } from "framer-motion"
import { useState } from "react";
import { useEffect } from "react"


export default function Loading() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (i < 100) {
        setI(i + 1);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [i]);

  return (
    <motion.div exit={{opacity:0,transition: { duration:.4, ease: [0.61, 1, 0.88, 1] }}} className="not-found">
      <div>
        <div className="mask">
          <motion.h1 animate={{ y: 100, transition: { delay: 2.3, ease: [0.61, 1, 0.88, 1] } }}>FITSOLE®</motion.h1>
        </div>
        <div className="mask">
          <motion.h1 animate={{ y: 100, transition: { delay: 2.2, ease: [0.61, 1, 0.88, 1] } }}>CAIRO. EGYPT.</motion.h1>
        </div>
        <div className="mask">
          <motion.h1 animate={{ y: 100, transition: { delay: 2.1, ease: [0.61, 1, 0.88, 1] } }}>2024</motion.h1>
        </div>
      </div>
      <motion.div className="count-loading" animate={{ y: 100, transition: { delay: 2, ease: [0.61, 1, 0.88, 1] } }}>
        {i == 100 ? i : `0${i}`}
      </motion.div>
    </motion.div >
  )
} 