import './App.css'
import Chat from './comp/chat'
import Navbar from './comp/navbar'
import Recent from './comp/recent'
import Search from './comp/search'
import Login from './comp/login'
import { useSelector } from 'react-redux'
import OtpVerification from './comp/otpVerification'

function App() {

  const logged = useSelector((state) => state.registration.logged)
  const userData = useSelector((state) => state.registration.userData)
  let otp = true

  if (userData && userData.otp && userData.otp != 1) {
    otp = false
  }

  return (
    <>
      { logged ? otp ? <>
        <Navbar />
        <Chat />
        <Recent />
        <Search /></>: <OtpVerification /> : <Login /> }
    </>
  )
}

export default App
