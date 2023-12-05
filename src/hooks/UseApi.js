import axios from '../axios/axios';
import  { useEffect, useState } from 'react'

const UseApi = (url,infos) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    useEffect(()=>{  
        axios.post(`${url}`,infos)
        .then(function (response) {
          setData(response.data)
          setLoading(false)
        })
        .catch(function (error) {
          setError(true) 
          setLoading(false)
        });  
    },[url])
    return {data , loading , error}
}
export default UseApi