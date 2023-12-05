import { useDispatch, useSelector } from 'react-redux'
import './FirstProduct.css'
import { Add } from '../../../redux/BagSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function FirstProduct({ data }) {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { bag } = useSelector(state => state.bag)

    const exists = bag.some(function (obj) {
        return obj?.id === data?.id;
    }); 

    const addtobag = e=> { 
        e.stopPropagation()
        if(exists) return
        dispatch(Add(data))
    }
    return (
        <div  className='principal-product c-p' onClick={e=>navigate(`/products/${data?.token}`)}>
            <div className="product-img">
                <button onClick={addtobag} className={`${exists && 'disabled'}`}>{exists?'IN BAG':'QUICK ADD' } </button>
                <img src={data?.mainImg} alt="" />
            </div>
            <p>{data?.name}</p>
            <p>MAD {Math.floor(data?.price * ((data?.discount || 100) / 100))}.00</p>
            {data?.discount ?
                <div className="discount">
                    <p className='original'>MAD {data?.price}.00</p>
                    <p className='discount-'>[-{data?.discount}%]</p>
                </div>
                : ''
            }
        </div>
    )
}
