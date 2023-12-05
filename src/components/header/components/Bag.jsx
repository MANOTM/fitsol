import { Link } from "react-router-dom"
import EmptyBag from "./EmptyBag"
import { motion } from "framer-motion"
import Product from "../../cards/Product/Product"
import BagCollection from "./BagCollection"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "../../../axios/axios"
import { INITIAL_BAG_SUGG } from "../../../redux/DataSlice" 

export default function Bag({ setOpenBag }) {
  const { bag } = useSelector(state => state.bag)
  const { BAG_SUGG } = useSelector(state => state.data)
  const [total,setTotal]=useState(0)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(BAG_SUGG.length) return
    axios.get('/sugg-bag')
      .then(function (response) { 
        dispatch(INITIAL_BAG_SUGG(response.data?.data))
      })
      .catch(function (error) {
      });
  },[])
  useEffect(()=>{
    const totalWithDiscount = bag.reduce(function(total, product) {
      var discountedPrice = Math.floor(product?.price * ((product?.discount || 100) / 100));
      return total + discountedPrice;
    }, 0);
    setTotal(totalWithDiscount)
  },[bag])
  return (
    <div className='login-overly' onClick={() => setOpenBag(0)}>
      <motion.div className="bag" onClick={e => e.stopPropagation()} initial={{ right: '-800px' }} animate={{ right: 0 }} exit={{ right: '-800px' }}>
        <div className="relative">
          <header className="space-between">
            <p className="login">YOUR BAG</p>
            <p className="small-text c-p" onClick={() => setOpenBag(0)}>Close [ x ]</p>
          </header>
          <div className="bag-content">
            {bag.length ? <BagCollection bag={bag}/> : <EmptyBag />}
            <div className="products-bag"> 
              {BAG_SUGG.map((product,indx)=><Product key={indx} data={product}/>)} 
            </div>
          </div>
          <footer>
            {bag.length ? <div className="bag-total small-text">
              <div className="space-between">
                <p>Shipping and taxes</p>
                <p className="op-8">Calculated at checkout</p>
              </div>
              <div className="space-between">
                <p>Total</p>
                <p>MAD {Math.floor(total)}.00</p>
              </div>
            </div> : ''}

            <Link to='/are-u-sure' className="btn small-text">
              Go Shopping
            </Link>
          </footer>
        </div>
      </motion.div>
    </div>
  )
}
