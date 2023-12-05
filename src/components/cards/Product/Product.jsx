import { Link } from 'react-router-dom'
import './Product.css'

export default function Product({ data }) {
    return (
        <Link to={`/products/${data.token}`} className='product small-text'>
            <div className="product-img">
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
        </Link>
    )
}
