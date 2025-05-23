import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { socket } from "../socket"
import { selectUser, addRecentUser, addNotification } from "../actions/actions"
import userImg from "../img/user.jpg"

function Chat() {

    const menu = useRef(null)

    const toggleTopNav = () => {
        menu.current.children[0].classList.toggle("rotate-45")
        menu.current.children[0].classList.toggle("top-2")
        menu.current.children[1].classList.toggle("rotate-[135deg]")
        menu.current.children[2].classList.toggle("opacity-0")
        menu.current.children[2].classList.toggle("rotate-45")
        document.getElementById("top-nav").classList.toggle("-translate-y-16")
        document.getElementById("chatbox").classList.toggle("-translate-y-16")
        document.getElementById("chatbox").classList.toggle("chatbox-height")
        document.getElementById("chatbox").classList.toggle("h-screen")
    }


    // Socket ->
    const dispatch = useDispatch()

    const messageContainer = useRef(null)

    var selected = localStorage.getItem("selected")
    useEffect(() => {
        try {
            if (!selected) return
            selected = JSON.parse(selected)
            dispatch(selectUser(selected))
        } catch {
        }
    }, [])

    const user = useSelector((state) => state.selected)

    const uid = useSelector((state) => state.registration.userData.uid)
    const pic = useSelector((state) => state.registration.userData.pic)

    // Fetch Messages Here 

    const [messageArr, setMessageArr] = useState()
    const [latestMessages, setLatestMessages] = useState([])

    const fetchMessages = async () => {
        if (!user || !user.user._id || !uid) return
        try {
            const res = await fetch(`/api/read-msg/${uid}/${user.user._id}`)
            const data = await res.json()
            setMessageArr(data)
            setTimeout(() => {
                messageContainer.current.scrollTop = messageContainer.current.scrollHeight
            }, 10);
        } catch {
            console.error("Error while fetching messages")
        }
    }

    useEffect(() => {
        setLatestMessages([])
        fetchMessages()
        console.log("user:", user)
    }, [user])

    useEffect(() => {
        socket.emit("connectUser", uid)
        socket.on("world message", (data) => {
            alert(data)
        })
    }, [])

    const updateRecent = async (sid, message) => {
        try {
            const res = await fetch(`/api/read-user/${sid}`)
            const data = await res.json()
            dispatch(addRecentUser({ _id: data[0]._id, name: data[0].name, pic: data[0].pic }))
            dispatch(addNotification({ _id: data[0]._id, name: data[0].name, pic: data[0].pic, message: message }))
        } catch (e) {
            console.error("Error while updating recent")
        }
    }


    const receiveMessage = (data) => {
        setLatestMessages((prevMessages) => [...prevMessages, data])
    }

    const messageRef = useRef(null)

    useEffect(() => {
        if (latestMessages[0] && user && latestMessages[0].sender !== user.user._id && latestMessages[0].sender !== uid) {
            updateRecent(latestMessages[0].sender, latestMessages[0].message)
            setLatestMessages([])
        } else if (!user && latestMessages[0]) {
            console.log(latestMessages)
            updateRecent(latestMessages[0].sender, latestMessages[0].message)
            setLatestMessages([])
        }
        if (messageContainer.current) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
        if (messageRef) {
            messageRef.current.value = ""
        }
    }, [latestMessages])

    useEffect(() => {
        socket.on("receive message", receiveMessage)
        return () => {
            socket.off("receive message", receiveMessage)
        }
    }, [])


    const sendMessage = (e) => {
        e.preventDefault()
        if (!user || !user.user._id || !uid) {
            alert("No user selected")
            return
        }
        socket.emit("send message", { message: messageRef.current.value, sender: uid, receiver: user.user._id })
        setLatestMessages((prevMessages) => [...prevMessages, { message: messageRef.current.value, sender: uid }])
    }

    const getProfileImage = (element) => {
        if (element.sender === uid) {
            return pic ? `/api/read-user-img/${pic}` : userImg;
        } else {
            if (user.user.pic) {
                return user.user.google === true
                    ? user.user.pic
                    : `/api/read-user-img/${user.user.pic}`;
            } else {
                return userImg;
            }
        }
    };


    return (
        <>
            <div id="chatbox" className="lg:ml-72 chatbox-height transition-all duration-200 ease-linear flex-1 p-2 sm:px-6 justify-between flex flex-col">
                <div className="flex sm:items-start justify-between py-3 border-b-2 border-gray-200">
                    <div className="relative flex items-center space-x-4">
                        <div className="relative">
                            <span className="absolute text-green-500 right-0 bottom-0">
                                <svg width="20" height="20">
                                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                </svg>
                            </span>
                            <div className="rounded-full overflow-hidden w-10 h-10 sm:w-16 sm:h-16">
                                <img src={ user && user.user.pic ? user.user.google && user.user.google == true ? user.user.pic : `/api/read-user-img/${user.user.pic}` : userImg } alt="" className="w-10 sm:w-16 rounded-full" />
                            </div>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3">{ user && user.user.name ? user.user.name : "Unknown" }</span>
                            </div>
                            <span className="text-lg text-gray-600">Chat now</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div ref={ menu } onClick={ toggleTopNav } className="transition-all fixed cursor-pointer">
                            <p className={ `w-6 h-1 bg-gray-600 rotate-45 top-2 rounded-md relative mt-4 ml-1 transition-all` }></p>
                            <p className={ `w-6 h-1 bg-gray-600 rotate-[135deg] rounded-md m-1 transition-all` }></p>
                            <p className={ `w-6 h-1 bg-gray-600 opacity-0 rotate-45 rounded-md mb-4 ml-1 transition-all` }></p>
                        </div>
                    </div>
                </div>
                <div ref={ messageContainer } id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded bg-[#f7fafc] scrollbar-track-blue-lighter mb-[13vh] scrollbar-track-blue-lighter h-full w-full hidden-scroll scrolling-touch">
                    { messageArr && messageArr.map((element, i) => (
                        <div key={ i } className="chat-message">
                            <div className={ `flex items-end ${element.sender === uid ? "justify-end" : "flex-row-reverse justify-end"}` }>
                                <div className={ `flex flex-col space-y-2 text-sm max-w-xs mx-2 ${element.sender === uid ? "items-end" : "items-start"}` }>
                                    <div><span className={ `px-4 py-2 anywhere-break rounded-lg inline-block ${element.sender === uid ? "rounded-br-none bg-blue-600 text-white" : "rounded-bl-none bg-gray-300 text-gray-600"}` }>{ element.message }</span></div>
                                </div>
                                <div className="rounded-full overflow-hidden w-6 h-6">
                                    <img src={getProfileImage(element)} alt="My profile" className="w-6 rounded-full order-2" />
                                </div>
                            </div>
                        </div>
                    )) }
                    { user && latestMessages && latestMessages.length > 0 && latestMessages.map((element, i) => (
                        <div key={ i } className="chat-message">
                            <div className={ `flex items-end ${element.sender === uid ? "justify-end" : "flex-row-reverse justify-end"}` }>
                                <div className={ `flex flex-col space-y-2 text-sm max-w-xs mx-2 ${element.sender === uid ? "items-end" : "items-start"}` }>
                                    <div><span className={ `px-4 py-2 anywhere-break rounded-lg inline-block ${element.sender === uid ? "rounded-br-none bg-blue-600 text-white" : "rounded-bl-none bg-gray-300 text-gray-600"}` }>{ element.message }</span></div>
                                </div>
                                <div className="rounded-full overflow-hidden w-6 h-6">
                                    <img src={getProfileImage(element)} alt="My profile" className="w-6 rounded-full order-2" />
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
            <div className="border-t-2 right-0 message-width border-gray-200 px-2 pt-4 mb-2 fixed bottom-0 bg-white">
                <form className="relative flex">
                    <input ref={ messageRef } id="user-message" type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 sm:pl-12 bg-gray-200 rounded-md py-3" />
                    <div className="absolute right-0 items-center inset-y-0 flex">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                        </button>
                        <button type="submit" onClick={ sendMessage } className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                            <span className="font-bold hidden sm:block">Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Chat