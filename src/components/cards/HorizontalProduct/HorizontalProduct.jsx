import { useDispatch } from 'react-redux'
import './HorizontalProduct.css'
import { Remove } from '../../../redux/BagSlice'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function HorizontalProduct({ data }) {
    const dispatch=useDispatch()
    const [count,setCount]=useState(1)
    const deletefrombag=()=>{
        dispatch(Remove(data.id))
    }
    const incr=()=>{
            if(count==data?.stock) return
            setCount(count+1)
    }
    const decr=()=>{
        if(count==1) return
        setCount(count-1)
    }
    return (
        <div className='horizontal-product small-text'>
            <Link to={`products/${data?.token}`}>
                <img src={data?.mainImg} alt="" />
            </Link>
            <div className="h-p-info">
                <div>
                    <div className="hpinfo-header">
                        <div>
                            <p className='medium-title'>{data?.name}</p>
                            <p>{data?.color}</p>
                            <div className="discount">
                                <p className="original">MAD {data?.price}.00</p>
                                <p className="discount-">[-{data?.discount}%]</p>
                            </div>
                        </div>
                        <p>MAD {Math.floor(data?.price * ((data?.discount || 100) / 100))}.00</p>
                    </div>
                </div>
                <div className='hpinfo-footer space-between'>
                    <div className="quantity">
                        <button className={`${count==1 && 'op-3'}`} onClick={decr}>-</button>
                        <p>{count}</p>
                        <button onClick={incr} className={` ${count==data?.stock && 'op-3'}`}>+</button>
                    </div>
                    <p className="underline c-p" onClick={deletefrombag}>
                        Remove
                    </p>
                </div>
            </div>
        </div>
    )
}
