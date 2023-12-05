import '../Auth.css'
import ExitAnimation from '../../../components/exitAnimation/ExitAnimation'
import Input from '../../../components/input/Input'
import { Tooltip } from '../../../icons/Tooltip'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react' 
import axios from '../../../axios/axios'

export default function Register() {
  const [Infos, SetInfos] = useState({ 'fname': '', 'lname': '', 'email': '', 'password': '' })
  const [Errors, setErrors] = useState({ 'fname': '', 'lname': '', 'email': '', 'password': '' })
  const [error, setError] = useState(null) 
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const register = e => {
    e.preventDefault()
    if (!Infos.email || !Infos.password || !Infos.fname || !Infos.lname || Infos.password.length < 6) {
      setErrors({
        fname: Infos.fname ? '' : 'Required',
        lname: Infos.lname ? '' : 'Required',
        email: Infos.email ? '' : 'Required',
        password: Infos.password ? '' : 'Required',
      })
      return
    }
    setLoading(true)
    axios.post('/register', { ...Infos, API_PASS: 12345 }
    )
      .then(function (response) {
        if(response.status==200){
          navigate('/login?status=w')
        } 
        setError(null)
        setLoading(false)
        
      })
      .catch(function (error) {
        setLoading(false)
        if (error.response?.data?.message) {
          setError(error.response?.data?.message)
          
        }
      });
  }
  return (
    <ExitAnimation>
      <div className='auth small-text register'>
        <div className='nav-auth'>
          <p className='login'>MY ACCOUNT</p>
          <div className="flex">
            <Link to='/login' className='op-8 small-text' >Login</Link>
            <p>[ Register ]</p>
          </div>
        </div>
        <form>
          <p className='login'>REGISTER</p>
          <div className="gird-2">
            <dir>
              <Input label='First Name' name='fname' value={Infos.fname} setValue={SetInfos} />
              {(Errors.fname || error?.fname) && <div className="error">
                <Tooltip />
                {Errors.fname || error.fname[0]}
              </div>}
            </dir>
            <div>
              <Input label='Last Name' name='lname' value={Infos.lname} setValue={SetInfos} />
              {(Errors.lname || error?.lname) && <div className="error">
                <Tooltip />
                {Errors.fname || error?.lname}
              </div>}
            </div>
          </div>
          <Input label='Email' name='email' type='email' value={Infos.email} setValue={SetInfos} />

          {(Errors.email || error?.email) && <div className="error">
            <Tooltip />
            {Errors.fname || error?.email}
          </div>}
          <Input label='Password' name='password' type='password' value={Infos.password} setValue={SetInfos} />

          {(Errors.password || error?.password) && <div className="error">
            <Tooltip />
            {Errors.fname || error?.password}
          </div>}
          <div className="form-tooltip" style={Infos.password ? (Infos.password.length > 5 ? { color: '#007177' } : { color: 'red' }) : {}}>
            <Tooltip />
            <p>Password must contain at least 6 characters</p>
          </div>
          <div className="action">
            <p>Already have an account? <Link to='/login' className='underline'>Login</Link></p>
          </div>
          <hr />
          <button className={`btn w-100 ${loading && 'loading'}`} onClick={register}>Create account</button>
        </form>
      </div>
    </ExitAnimation>
  )
}
