import { useEffect } from 'react'
import './App.css'
import Chat from './comp/chat'
import Navbar from './comp/navbar'
import Recent from './comp/recent'
import Search from './comp/search'
import Login from './comp/login'
import { useSelector } from 'react-redux'

function App() {

  const logged = useSelector((state) => state.registration.logged)

  return (
    <>
      { logged ? <>
        <Navbar />
        <Chat />
        <Recent />
        <Search /></> : <Login /> }
    </>
  )
}

export default App
