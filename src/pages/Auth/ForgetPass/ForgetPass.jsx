import React, { useState } from 'react'
import ExitAnimation from '../../../components/exitAnimation/ExitAnimation'
import { Link } from 'react-router-dom'
import Input from '../../../components/input/Input'
import { Tooltip } from '../../../icons/Tooltip'
import axios from '../../../axios/axios'
import { Succes } from '../../../icons/Succes'

export default function ForgetPass() {
  const [Email, setEmail] = useState({ email: '' })
  const [Error, setError] = useState('') 
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const forget = e =>{
    e.preventDefault() 
    if(!Email?.email) {
      setError('Required')
      return
    }
    setLoading(true)
    axios.post('/FotgertPassword', { ...Email, API_PASS: 12345 }
    )
      .then(function (response) {
        if(response.status==200){
          setSucces(true)
        } 
        setError(null)
        setLoading(false)
        
      })
      .catch(function (error) {
        setLoading(false)
        if (error.response?.data?.message) {
          setError(error.response?.data?.message?.email)
          setSucces(false)
        }
      });
  }
  return (
    <ExitAnimation>
      <div className="auth small-text forget">
        <div className="nav-auth">
          <p className='login'>MY ACCOUNT</p>
          <div className="flex">
            <Link to='/login' className='op-8 small-text c-p' >Login</Link>
            <Link to='/register' className='op-8 small-text c-p' >Register</Link>
          </div>
        </div>

        <form>
        {(succes && !Error) &&
            <div className="succes">
              <Succes />
              <p>A reset password email has been sent to your email address.</p> 
            </div>
          }
          <p className='login'>FORGOT PASSWORD?</p>
          <Input name='email' label='Email' setValue={setEmail} value={Email.email} />
          {(Error) && <div className="error">
            <Tooltip />
            {Error}
          </div>}
          <hr />
          <div className="space-between login-action">
            <Link to='/register' className='small-text underline' >Create an account</Link>
            <button className={`btn small-text c-p ${loading && 'loading'}`} onClick={forget}>Send reset email</button>
          </div>
        </form>
      </div>
    </ExitAnimation>
  )
}
