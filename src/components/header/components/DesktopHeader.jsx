import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "../../../icons/Logo";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function DesktopHeader({ setSearchShow, SearchShow, setShowLogin, setOpenBag }) {
    const path = useLocation().pathname

    const { user } = useSelector(state => state.user) 
    const { bagLenght } = useSelector(state => state.bag)
    return (
        <div className={`desktop-header small-text ${SearchShow && 'active'}`}>
            <Link to='/' className="logo">
                <Logo />
            </Link>
            <motion.div className="desktop-item search-btn" onClick={() => setSearchShow(true)} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .6, duration: .5 }}>
                Search
            </motion.div>
            <motion.div className="flex" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .7, duration: .5 }}>
                <NavLink to='/shop' className="desktop-item">Shop</NavLink>
                <NavLink to='/shop/men' className="desktop-item">Men</NavLink>
                <NavLink to='/shop/women' className="desktop-item">Women</NavLink>
                <NavLink to='/shop/kids' className="desktop-item">Kids</NavLink>
            </motion.div>
            <motion.div className="flex" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .8, duration: .5 }}>
                {user ?
                    <NavLink to='/account' className="desktop-item">{user?.fname}</NavLink>
                    :
                    <p className={`desktop-item ${path == '/login' || path == '/register' || path == '/forget' ? 'active ' : ''}`} onClick={() => setShowLogin(1)}>My Account,</p>
                }
                <p className="desktop-item" onClick={() => setOpenBag(1)}>Bag {bagLenght ? `[${bagLenght}]` : ''}</p>
            </motion.div>
        </div>
    )
}
