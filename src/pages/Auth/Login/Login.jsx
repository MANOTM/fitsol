import React, { useEffect, useState } from 'react'
import ExitAnimation from '../../../components/exitAnimation/ExitAnimation'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../components/input/Input'
import { Succes } from '../../../icons/Succes'
import { Tooltip } from '../../../icons/Tooltip'
import axios from '../../../axios/axios'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { loginIn } from '../../../redux/UserSlice'

export default function Login() {
  const [Infos, setInfos] = useState({ 'email': '', 'password': '' })
  const [Errors, setErrors] = useState({'email': '', 'password': '' })
  const [succes, setSucces] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const status = urlParams.get('status'); 
  useEffect(() => { 
    if (token) { 
      axios.post('/verifyToken', { API_PASS: 12345 },{
        headers:{'Authorization':'Bearer '+token}
      }).then(function (response) {
        setSucces(true)
        setError(null)
        setLoading(false)
      })
        .catch(function (error) {
          setSucces(false)
          setError('The verification link is invalid or has expired.')
        });
    }
  }, [token])

  const login = e => {
    e.preventDefault()
    if (!Infos.email || !Infos.password) {
      setErrors({
        email: Infos.email ? '' : 'Required',
        password: Infos.password ? '' : 'Required',
      }) 
      return
    }
    setLoading(true)
    axios.post('/login', { ...Infos, API_PASS: 12345 })
      .then(function (response) {
        if (response.status == 200) {
          Cookies.set('token',response.data.data.token) 
          dispatch(loginIn(response.data.data))
          navigate('/account')
        }
        setError(null)
        setLoading(false)
      })
      .catch(function (error) {
        if(error.response?.data?.message?.email || error.response?.data?.message?.password){
          setErrors(error.response.data.message)
        }else{
          setErrors({})
          setSucces(false)
          setError(error.response.data.message)
        }
        setLoading(false)
      });
  }

  return (
    <ExitAnimation>
      <div className="auth small-text">
        <div className="nav-auth">
          <p className='login'>MY ACCOUNT</p>
          <div className="flex">
            <p>[ Login ]</p>
            <Link to='/register' className='op-8 small-text c-p' >Register</Link>
          </div>
        </div>
        <form>
          {(status=='w' || status=='pu' && !error && !succes) &&
            <div className="succes">
              <Succes />
              <p>{status=='pu'?'Your password has been updated successfully.':'A verification email has been sent to your email address.'}</p> 
            </div>
          }
          {(error) &&
            <div className="error">
              <Tooltip />
              <p>{error}</p>

            </div>
          }
          {(succes) &&
            <div className="succes">
            <Succes />
              <p>Your email has been verified.</p>
            </div>
          }
          <p className='login'>LOGIN</p>
          <Input name='email' type='email' label='Email' value={Infos.email} setValue={setInfos} />
          {(Errors?.email) && <div className="error">
            <Tooltip />
            {Array.isArray(Errors.email)? Errors?.email[0] : Errors?.email}
          </div>}
          <Input name='password' type='password' label='Password' value={Infos.password} setValue={setInfos} />
          {(Errors?.password) && <div className="error">
            <Tooltip />
            {Array.isArray(Errors.password)? Errors?.password[0] : Errors?.password}
          </div>}
          <div className="action">
            <Link to='/forget'>Forgot password?</Link>
          </div>
          <hr />

          <div className="space-between login-action">
            <Link to='/register' className='small-text underline' >Create an account</Link>
            <button className={`btn small-text c-p ${loading && 'loading'}`} onClick={login}>Login</button>
          </div>
        </form>
      </div>
    </ExitAnimation>
  )
}
