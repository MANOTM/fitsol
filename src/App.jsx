import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home/Home"
import { AnimatePresence } from "framer-motion"
import Register from "./pages/Auth/Register/Register"
import Login from "./pages/Auth/Login/Login"
import ForgetPass from "./pages/Auth/ForgetPass/ForgetPass"
import Shop from "./pages/Shop/Shop"
import Account from "./pages/Auth/Account/Account"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import AuthRoute from "./components/protectedRoute/AuthRoute"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchUser } from "./redux/UserSlice"
import ResetPassword from "./pages/Auth/Reset/ResetPassword"
import NotFound from "./pages/404/404"
import Preview from "./pages/Preveiw/Preview"
import AreUSure from "./pages/Are-u-sure/AreUSure"
import Loading from "./components/loading/Loading"

function App() {
  const loacation = useLocation()
  const [lodn, setLoad] = useState(true)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false)
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <AnimatePresence>
        {lodn ? <Loading /> :
          <Routes location={loacation} key={loacation.pathname}>
            <Route path="/" element={<Home />} />
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/Forget" element={<ForgetPass />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<ResetPassword />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:index" element={<Shop />} />
            <Route path="/products/:product" element={<Preview />} />
            <Route path="/are-u-sure" element={<AreUSure />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
      </AnimatePresence>
    </>
  )
}

export default App
