import './Home.css'
import ExitAnimation from '../../components/exitAnimation/ExitAnimation'
import { Link } from 'react-router-dom'
import FirstProduct from '../../components/cards/FirstProduct/FirstProduct'
import Footer from '../../components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from '../../axios/axios'
import { INITIAL_NEW_ARRIVALS } from '../../redux/DataSlice'
import { Skeleton } from '../../components/Skeleton/Skeleton'

export default function Home() {
  const { NEW_ARRIVALS } = useSelector(state => state.data)
  const dispatch = useDispatch()
  useEffect(() => {
    if (NEW_ARRIVALS.lenght) return
    axios.get('/newArrival', { API_PASS: 12345 })
      .then(function (response) {
        dispatch(INITIAL_NEW_ARRIVALS(response.data?.data))
      }) 
  }, [])
  return (
    <ExitAnimation>
      <div className='home'>
        <div className="bgw">

          <section className='Hero_container center'>
            <div className="sticky-box">
              <p>UP TO 60% OFF</p>
              <p>BLACK FRIDAY SALE</p>
              <p>ONLINE & IN-STORES</p>
            </div>
          </section>
          <section className='products-list small-text'>
            <Link className='underline left'>Shop All</Link>
            <div className="products-list-head">
              <p className='login'>NEW ARRIVALS</p>
            </div>
            <div className="products-list-products">
              {!NEW_ARRIVALS.length && 
              [1,2,3,4].map(item=>
                <div style={{height:'400px'}} key={item}>
                  <Skeleton /> 
                </div>
                )
              }  
              {NEW_ARRIVALS.map((product,indx) => <FirstProduct data={product} key={indx}/>)}
            </div>
          </section>
          <section className='break-text'>
            <div>
              A SNEAKER SOCIETY & CULTURE <span className='space'>blabla</span> STORE CURATED BY SNEAKER HEADS IN CAIRO, EGYPT.
            </div>
          </section>
          <section className='shop_now' >
            <Link to='/shop/men' className="men">
              <img src="https://res.cloudinary.com/drln0tnyu/image/upload/v1700219788/c46bdb7f-ce09-439b-9a5c-7bf8a2be03f5_category-card-men_afxwc9.webp" alt="" />
              <div className='stick-bottom'>
                <p>MENS APPAREL</p>
                <p>SHOP NOW</p>
              </div>
            </Link>
            <Link to='/shop/women' className="women">
              <img src="https://res.cloudinary.com/drln0tnyu/image/upload/v1700219789/16a710de-602a-400e-b9d2-45e1663957a6_category-card-women_agya6w.webp" alt="" />
              <div className='stick-bottom'>
                <p>WOMENS APPAREL</p>
                <p>SHOP NOW</p>
              </div>
            </Link>
          </section>
        </div>
        <section className='school-collection'>
          <h1>BACK TO SCHOOL <br /> COLLECTION</h1>
        </section>
        <section className='show-school-collection'>

        </section>
        <Footer />
      </div>
    </ExitAnimation>
  )
}
