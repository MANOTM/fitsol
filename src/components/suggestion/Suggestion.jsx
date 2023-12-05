import React, { useEffect, useState } from 'react'
import FirstProduct from '../cards/FirstProduct/FirstProduct'
import axios from '../../axios/axios';

export default function Suggestion() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/alsolike')
            .then(function (response) {
                setData(response.data.data)
            })
    }, [])
    return (

        <div className="likes">
            <div className="login center">
                YOU MAY ALSO LIKE
            </div>

            <div className="products-list-products">
                {data?.map((item,indx)=> <FirstProduct key={indx} data={item}/>)} 
            </div>
        </div>
    )
}
