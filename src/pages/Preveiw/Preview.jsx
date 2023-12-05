import { Link, useParams } from 'react-router-dom'
import ExitAnimation from '../../components/exitAnimation/ExitAnimation'
import './Preview.css'
import Exchange from '../../icons/images/Exchange.png'
import RETURN from '../../icons/images/return.png'
import shipping from '../../icons/images/shippingpng.png'
import Footer from '../../components/footer/Footer'
import { useEffect, useState } from 'react'
import axios from '../../axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import { Add } from '../../redux/BagSlice'
import Suggestion from '../../components/suggestion/Suggestion'
import LoadingProduct from './LoadingProduct'

export default function Preview() {
    const { product } = useParams()
    const [data, setData] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setErrore] = useState(null)
    const [active, setActive] = useState('')

    const dispatch = useDispatch()
    const { bag } = useSelector(state => state.bag)

    const exists = bag.some(function (obj) {
        return obj?.id === data?.id;
    });

    const addtobag = e => {
        e.stopPropagation()
        if (exists) return
        dispatch(Add(data))
    }
    useEffect(() => {
        setLoading(true)
        axios.get('/product/' + product || '')
            .then(function (response) {
                setData(response.data.data)
                setLoading(false)
            })
            .catch(function (error) {
                setErrore(true)
                setLoading(false)
            });
    }, [product])

    return (
        <ExitAnimation>
            {loading ? <LoadingProduct /> :
                <div className="preveiw small-text">
                    <div className="Breadcrumbs">
                        <Link className='op-8'>Home</Link>
                        <p className='point'>.</p>
                        <Link to={`/shop/${data?.genre}`} className='op-8'>{data?.genre == 'men' ? 'Mens' : data?.genre == 'women' ? 'Womens' : data?.genre == 'kids' ? 'Kids' : ''}</Link>
                        <p className='point'>.</p>
                        <Link to={`/shop?search=${data?.brind}`} className='op-8'>{data?.brind}</Link>
                        <p className='point'>.</p>
                        <p>{data?.name}</p>
                    </div>
                    <div className="preview-hero">
                        <div className='images'>
                            <div className="img">
                                <img src={data?.mainImg} alt="" />
                            </div>
                            <div className="img">
                                <img src={data?.secondImg} alt="" />
                            </div>
                        </div>
                        <div className="preview-details">
                            <h1>{data?.name}</h1>
                            <div className="flex">
                                <p className='price'>MAD {Math.floor(data?.price * ((data?.discount || 100) / 100))}.00</p>
                                {data?.discount ?
                                    <div className="discount">
                                        <p className='original'>MAD {data?.price}.00</p>
                                        <p className='discount-'>[-{data?.discount}%]</p>
                                    </div>
                                    : ''}
                            </div>
                            <div className="size">
                                <p className='login'>SIZE</p>
                                <div className={`flex ${exists && 'disabled'}`}>
                                    {data?.size?.map((item, ind) =>
                                        <button key={ind} className={`btn-size ${active == 38 + ind ? 'active' : ''}`} onClick={() => setActive(38 + ind)}>EU {38 + ind}</button>)}
                                </div>
                                <button className={`add-tc ${exists && 'disabled'}`} onClick={addtobag}>{exists ? 'IN BAG' : 'QUICK ADD'}</button>
                                <div className="option-drawer">
                                    <div className="item">
                                        <img src={Exchange} alt="" />
                                        <p>EASY EXCHANGES</p>
                                    </div>
                                    <div className="item">
                                        <img src={RETURN} alt="" />
                                        <p>30 DAY RETURNS</p>
                                    </div>
                                    <div className="item">
                                        <img src={shipping} alt="" />
                                        <p>FAST SHIPPING</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="product-desc">
                                    <div className="login">
                                        DETAILS
                                    </div>
                                    <p>{data?.description}</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <Suggestion />
                </div>

            }
            <Footer />
        </ExitAnimation>
    )
}
