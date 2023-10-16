import { useEffect } from 'react'
import './App.css'
import Chat from './comp/chat'
import Navbar from './comp/navbar'
import Recent from './comp/recent'
import Search from './comp/search'
import { socket } from './socket'
import Login from './comp/login'
import { useSelector } from 'react-redux'

function App() {

  const logged = useSelector((state) => state.registration.logged)

  useEffect(() => {
    setTimeout(() => {
      socket.emit("came", "How are you doing")
    }, 3000);
    const messHandle = (msg) => {
      alert(msg)
    }
    socket.on("message", messHandle)
    return () => {
      socket.off("message", messHandle);
    }
  }, [])


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
