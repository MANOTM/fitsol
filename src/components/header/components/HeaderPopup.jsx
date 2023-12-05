import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Close } from '../../../icons/Close'
import { Logo } from '../../../icons/Logo'
import { useSelector } from 'react-redux'

export default function HeaderPopup({ setShowHeaderPopup }) {
    
    const { user } = useSelector(state => state.user) 
    return (
        <motion.div className="header_popup" initial={{height:0,top:-10}} animate={{top:0,height:'100%'}} exit={{height:0,top:-50}}>
            <div className="space-between">
                <Link to='/' className="logo">
                    <Logo />
                </Link>
                <div className='c-p' onClick={() => setShowHeaderPopup(0)}>
                    <Close />
                </div>
            </div>
            <motion.div className="links" initial={{opacity:0}} animate={{opacity:1,transition:{delay:.2}}} exit={{opacity:0}}>
                <Link to='/shop'>SHOP</Link>
                <Link to='/shop/men'>MEN</Link>
                <Link to='/shop/women'>WOMEN</Link>
                <Link to='/shop/kids'>KIDS</Link>
                <Link to={user ? '/account' :'/login'}>MY ACCOUNT</Link>
            </motion.div>
        </motion.div>
    )
}
