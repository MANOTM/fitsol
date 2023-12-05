import React from 'react'
import ExitAnimation from '../../../components/exitAnimation/ExitAnimation'
import {useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/UserSlice'
import Cookies from 'js-cookie'

export default function Account() {
  const {user}=useSelector(state=>state.user) 
  const dispatch = useDispatch()

  const logOut=()=>{
    Cookies.remove('token')
    dispatch(logout()) 
  } 
  return (
    <ExitAnimation>
      <div className="auth small-text">
        <div className="nav-auth">
          <p className='login'>MY ACCOUNT</p>
          <div className="flex">
            <p>[ Personal Details ]</p>
            <p className='op-8 small-text c-p' onClick={logOut}>Logout</p>
          </div>
        </div>
        <form>
          <p className='login uppercase'>WELCOME {user?.fname}</p>  
          <p style={{marginBottom:'3rem'}}>Welcome to your account page ,here you can view your personal information ,if you wish to log out, you can do so using the logout option.</p>
          <p className='login'>Personal Details</p>  
          <p>{`${user?.fname} ${user?.lname}`}</p>
          <p>{user?.email}</p>
        </form>
      </div>
    </ExitAnimation>
  )
}
