import './Shop.css'
import { useEffect, useState } from 'react'
import ExitAnimation from '../../components/exitAnimation/ExitAnimation'
import { Link, useLocation, useParams } from 'react-router-dom'
import FirstProduct from '../../components/cards/FirstProduct/FirstProduct'
import Footer from '../../components/footer/Footer'
import { motion } from 'framer-motion'
import axios from '../../axios/axios'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import Pagination from '../../components/pagination/Pagination'

export default function Shop() {
    const { index } = useParams()
    const [data, setData] = useState([])
    const [dataSorted, setDataSorted] = useState([])
    const [loading, setLoading] = useState(false)
    const pathname = useLocation().pathname
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const page = urlParams.get('page');

    const sort = e => {
        setLoading(true)
        toTop()
        setTimeout(() => {
            var newdata = dataSorted
            if (e.target.value == 'Z-A') {
                newdata = dataSorted.sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else if (e.target.value == 'A-Z') {
                newdata = dataSorted.sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else if (e.target.value == 'l-h') {
                newdata = dataSorted.sort((a, b) => a.price - b.price);
            } else if (e.target.value == 'h-l') {
                newdata = dataSorted.sort((a, b) => b.price - a.price);
            }
            setLoading(false)
            setDataSorted(newdata)
        }, [1000])
    }
    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    useEffect(() => {
        setLoading(true)
        toTop()
        axios.post(`/${index ? (index == 'men' ? 'products-men' : (index == 'women' ? 'products-women' : (index == 'kids' ? 'products-kids' : 'shop-all'))) : (search ? 'search' : 'shop-all')}`, { term: search, page })
            .then(function (response) { 
                setData(response.data.data)
                setDataSorted(response.data.data.data)
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
            });
    }, [index, search, page])
    return (
        <ExitAnimation>
            <div className="shop small-text">
                <div className="shop-header">
                    {!search &&
                        <div className="s-h-flex">
                            <Link to='/' className='op-8'>Home</Link>
                            <p className='point'>.</p>
                            <p>{index ? (index == 'men' ? 'Men' : (index == 'women' ? 'Women' : (index == 'kids' ? 'Kids' : 'Shop'))) : 'Shop'}</p>
                        </div>
                    }
                    <div className="s-h-big-text">
                        {search ? search :
                            <>
                                SHOP OUR {index ? (index == 'men' ? 'MENS NEW ARRIVALS' : (index == 'women' ? 'WOMENS NEW ARRIVALS' : (index == 'kids' ? 'KIDS NEW ARRIVALS' : ''))) : ''} COLLECTIONS AND EXPLORE THE LATEST PRODUCTS AND STYLES.
                            </>
                        }
                    </div>
                </div>
                <div className="header-sticky">
                    <div className="h-s-head">
                        <div className="s-h-flex">
                            <p className='op-8'>Results:</p>
                            <p >[ {data.total} ]</p>
                        </div>
                        <p className="login">
                            {search ? 'PRODUCT RESULTS' :
                                <>
                                    {index ? (index == 'men' ? 'MENS NEW ARRIVALS' : (index == 'women' ? 'WOMENS NEW ARRIVALS' : (index == 'kids' ? 'KIDS NEW ARRIVALS' : 'ALL PRODUCTS'))) : 'ALL PRODUCTS'}
                                </>
                            }

                        </p>
                        <div className='sort'>
                            <select onChange={sort}>
                                <option value=''>Sort by: Featured</option>
                                <option value="A-Z">Alphabetically, A-Z</option>
                                <option value="Z-A">Alphabetically, Z-A</option>
                                <option value="l-h">Price, low to high</option>
                                <option value="h-l">Price, high to low</option>
                            </select>
                        </div>
                    </div>
                </div>
                <motion.div className="shop-lits" >
                    {loading &&
                        [1, 2, 3, 4, 5, 6, 7, 8].map(item =>
                            <div style={{ height: '400px' }} key={item}>
                                <Skeleton />
                            </div>
                        )
                    }
                    {

                        data.total && !loading ?
                            dataSorted.map((product, indx) => <FirstProduct data={product} key={indx} />)
                            :
                            <h1 className='no'>NO PRODUCT FOUND</h1>
                    }
                </motion.div>
                <Pagination data={data} current_path={`${pathname}?serch=${search || ''}`} />
            </div>
            <Footer />
        </ExitAnimation>
    )
}