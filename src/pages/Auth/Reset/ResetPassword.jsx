import { Link, redirect, useNavigate } from "react-router-dom";
import ExitAnimation from "../../../components/exitAnimation/ExitAnimation";
import Input from "../../../components/input/Input";
import { Succes } from "../../../icons/Succes";
import { Tooltip } from "../../../icons/Tooltip";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import UseApi from "../../../hooks/UseApi";

export default function ResetPassword() {
    const [passwords, setPasswords] = useState({ fpassword: '', spassword: '' })
    const [loading1, setLoading] = useState(false)

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const [ErrorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate()

    const { loading, error } = UseApi('/CheckToken', { email, token, API_PASS: 12345 })

    useEffect(() => {
        if (!token || !email) navigate('/forget')
        if (error) navigate('/forget')
    }, [error, loading])

    const change = e => {
        e.preventDefault()
        if (passwords.fpassword == '' || passwords.spassword == '') {
            setErrorMsg('All fields are required.')
            return
        } else if (passwords.fpassword != passwords.spassword) {
            setErrorMsg('The passwords do not match.')
            return
        }
        setErrorMsg('')
        setLoading(true)
        axios.post('/resetPassword',{...passwords,API_PASS:12345,email,token}).
        then(function (response) {
            navigate('/login?status=pu')
          })
          .catch(function (error) { 
            setLoading(false)
            setErrorMsg('The passwords must be match and greater than 5 characters')
          }); 
    }
    return (

        loading ? <></> :
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
                        {(ErrorMsg) &&
                            <div className="error">
                                <Tooltip />
                                <p>{ErrorMsg}</p>
                            </div>
                        } 
                        <p className='login'>RESET PASSWORD</p>
                        <Input name='fpassword' label='New Password' value={passwords.fpassword} setValue={setPasswords} />
                        {/* {(Error) && <div className="error">
                        <Tooltip />
                        {Error}
                    </div>} */}
                        <Input name='spassword' label='Confirm new password' value={passwords.spassword} setValue={setPasswords} />
                        {/* {(Error) && <div className="error">
                        <Tooltip />
                        {Error}
                    </div>} */}
                        <button className={`btn w-100 small-text c-p ${loading1 && 'loading'}`} onClick={change}>Change password</button>
                    </form>
                </div>
            </ExitAnimation>

    )
}
