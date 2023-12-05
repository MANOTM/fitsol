import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization':'Bearer ' + Cookies.get('token'),
    }, 
    withCredentials: true,
})