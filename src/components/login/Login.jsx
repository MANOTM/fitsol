import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../input/Input'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from '../../axios/axios'
import { loginIn } from '../../redux/UserSlice'
import { Tooltip } from '../../icons/Tooltip'
import Cookies from 'js-cookie'

export default function Login({ setShowLogin }) {

    const [Inputs, setInputs] = useState({ email: '', password: '' })
    const [Errors, setErrors] = useState({ 'email': '', 'password': '' })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = e => {
        e.preventDefault()
        if (!Inputs.email || !Inputs.password) {
            setErrors({
                email: Inputs.email ? '' : 'Required',
                password: Inputs.password ? '' : 'Required',
            })
            return
        }

        setLoading(true)
        axios.post('/login', { ...Inputs, API_PASS: 12345 })
            .then(function (response) {
                if (response.status == 200) {
                    Cookies.set('token', response?.data?.data?.token)
                    dispatch(loginIn(response?.data?.data))
                    navigate('/account')
                }
                setError(null)
                setLoading(false)
            })
            .catch(function (error) {
                if (error.response?.data?.message?.email || error.response?.data?.message?.password) {
                    setErrors(error.response.data.message)
                } else {
                    setErrors({})
                    setError(error.response.data.message)
                }
                setLoading(false)
            });
    }

    return (
        <div className='login-overly ' onClick={() => setShowLogin(0)}>
            <motion.div className="login-popup" onClick={e => e.stopPropagation()} initial={{ top: '-300px' }} animate={{ top: 0 }} exit={{ top: '-300px' }}>
                <div className="space-between">
                    <p className='login'>LOGIN</p>
                    <p className='small-text c-p' onClick={() => setShowLogin(0)}>Close [ x ]</p>
                </div>
                {(error) &&
                    <div className="error small-text" style={{marginTop:'.5rem'}}>
                        <Tooltip />
                        <p>{error}</p>

                    </div>
                }
                <form className='small-text'>
                    <Input name='email' type='email' label='Email' value={Inputs.email} setValue={setInputs} />
                    {(Errors?.email) && <div className="error">
                        <Tooltip />
                        {Array.isArray(Errors.email) ? Errors?.email[0] : Errors?.email}
                    </div>}
                    <Input type='password' name='password' label='Password' value={Inputs.password} setValue={setInputs} />
                    {(Errors?.password) && <div className="error">
                        <Tooltip />
                        {Array.isArray(Errors.password) ? Errors?.password[0] : Errors?.password}
                    </div>}
                </form>
                <Link to='/forget' className='small-text forget-btn' onClick={() => setShowLogin(0)}>Forget password?</Link>
                <hr />
                <div className="space-between login-action">
                    <Link to='/register' className='small-text underline' onClick={() => setShowLogin(0)}>Create an account</Link>
                    <button className={`btn small-text c-p ${loading && 'loading'}`} onClick={login}>Login</button>
                </div>
            </motion.div>
        </div>
    )
}
