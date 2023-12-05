import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'  
import Account from '../../pages/Auth/Account/Account';

export default function AuthRoute() {
    const { user, loading } = useSelector(state => state.user)  
    return loading ? (<div></div>) : user ? <Account/>: <Outlet />
}
