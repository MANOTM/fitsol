import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Skeleton } from "../../Skeleton/Skeleton"
import axios from "../../../axios/axios"

export default function SearchDesktop({ setSearchShow }) {
    const [value, setValue] = useState('')
    const [result, setresult] = useState(0)
    const [loading, setLoading] = useState(0)
    const navigate=useNavigate()
    const go = e=>{
        if(e.key=='Enter' && result) 
        {setSearchShow(false)
            navigate(`/shop?search=${value}`)
        }
    }
    useEffect(() => {
        if (!value) {
            setresult(0)
            return
        }
        setLoading(true)
        const search = () => {
            axios.get('searchcount/' + value)
                .then(function (response) {
                    setresult(response.data?.data)
                    setLoading(false)
                })
                .catch(function (error) {
                    setLoading(false)
                });
        }
        const timeOut = setTimeout(() => {
            if (value) {
                search()
            }
        }, 1000)

        return () => { clearTimeout(timeOut) }
    }, [value])
    return (
        <div className='search-desktop' onClick={() => setSearchShow(false)} onKeyDown={go}>
            <motion.header initial={{ top: '-200px' }} animate={{ top: 0, transition: { duration: .6, ease: [0.25, 1, 0.5, 1] } }} exit={{ top: '-150px' }} onClick={e => e.stopPropagation()}>
                <div className='search'>
                    <input type="text" placeholder='SEARCH' value={value} onChange={e => setValue(e.target.value)} />
                    {loading ?
                        <div style={{ height: 20, width: 100 }}>
                            <Skeleton />
                        </div>
                        :
                        < Link onClick={() => setSearchShow(false)} to={`/shop?search=${value}`} className={`close small-text c-p ${result? '':'disabled'}`}>Results [{result}]</Link>
                    }
                </div>
            </motion.header >
        </div >
    )
}
