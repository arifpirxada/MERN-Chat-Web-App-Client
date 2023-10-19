import { useSelector, useDispatch } from "react-redux"
import { selectUser, setRecentUsers } from "../actions/actions"
import { useEffect } from "react"
import userImg from "../img/user.jpg"

function Recent() {

    const closeRecent = () => {
        document.getElementById("sidenav-bg").classList.add("opacity-0")
        document.getElementById("sidenav-bg").classList.add("hidden")
        document.getElementById("sidenav").classList.remove("w-72")
        document.getElementById("sidenav").classList.add("w-0")
    }

    const recentUsers = useSelector((state) => state.recentUsers)
    const uid = useSelector((state) => state.registration.userData.uid)

    const dispatch = useDispatch()

    const fetchRecentUsers = async () => {
        if (!uid) return
        try {
            const res = await fetch(`/api/read-recent/${uid}`)
            const data = await res.json()
            if (data.message !== "No recents found") {
                dispatch(setRecentUsers(data))
            }
        } catch (e) {
            console.log("Error while setting recent users")
        }
    }

    useEffect(() => {
        fetchRecentUsers()
    }, [uid])

    return (
        <>
            <nav
                id="sidenav"
                className="fixed left-0 top-0 z-50 h-full w-0 lg:w-72 -translate-x-full overflow-y-scroll hidden-scroll transition-all duration-200 ease-linear bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
                data-te-sidenav-init
                data-te-sidenav-hidden="false"
                data-te-sidenav-position="absolute">
                <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
                    <li className="relative mb-2">
                        <div
                            className="flex h-12 items-center justify-between truncate rounded-[5px] px-4 py-4 text-[0.875rem] text-gray-600 outline-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
                            <div className="flex">

                                <span className="[&>svg]:w-5 mr-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span>Recent Conversations</span>
                            </div>
                            <span

                                onClick={ closeRecent }
                                className="w-[1em] lg:hidden cursor-pointer focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6 text-white">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </div>
                    </li>
                    {/* User Listing  Here */ }

                    <div className="flex flex-col">
                        <hr className="border border-[#737373]" />
                        { recentUsers.map((element, i) => (
                            <div key={ i }>
                                <div onClick={ () => { dispatch(selectUser({ _id: element._id, name: element.name, pic: element.pic })); localStorage.setItem("selected", JSON.stringify({ _id: element._id, name: element.name, pic: element.pic })) } } className="mb-1 text-white transition duration-300 ease-linear cursor-pointer flex items-center hover:bg-slate-700" >
                                    <div className="rounded-full overflow-hidden">
                                        <img src={ element.pic ? `/api/read-user-img/${element.pic}` : userImg }
                                            className="my-2 rounded-full shadow-lg dark:shadow-black/20 w-[50px]" alt="" />
                                    </div>
                                    <div className="pl-2">
                                        <p className="font-bold">{ element.name }</p>
                                    </div>
                                </div><hr className="border border-[#737373]" />
                            </div>
                        )) }

                    </div>
                </ul >
            </nav >
        </>
    )
}

export default Recent