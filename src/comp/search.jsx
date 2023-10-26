import { useEffect, useState } from "react"
import userImg from "../img/user.jpg"
import { useSelector, useDispatch } from "react-redux"
import { addRecentUser } from "../actions/actions"

function Search() {

    const closeSearch = () => {
        document.getElementById("search-nav").classList.add("invisible")
        document.getElementById("search-nav").classList.add("translate-x-full")
        document.getElementById("search-bg").classList.toggle("hidden")
        document.getElementById("search-bg").classList.toggle("opacity-0")
    }

    const [skip, setSkip] = useState(0)
    const [num, setNum] = useState(1)
    const [userData, setUserData] = useState([])

    const fetchUsers = async () => {
        try {
            const res = await fetch(`/api/read-users/${skip}`)
            const data = await res.json()
            if (skip === 0) {
                setUserData(data)
            } else {
                const updateData = userData
                data.map((element) => {
                    updateData.push(element)
                })
                setUserData(updateData)
            }
            if (skip < num) {
                setSkip(skip + 20)
            }
        } catch (e) {
            console.error("Error while fetching users", e)
        }
    }

    const getUserNum = async () => {
        try {
            const res = await fetch(`/api/read-users-num`)
            const data = await res.json()
            setNum(data.num)
            fetchUsers()
        } catch {
            console.error("Error while fetching users number")
        }
    }

    useEffect(() => {
        getUserNum()
    }, [])


    // Search Here ->
    const [searchNum, setSearchNum] = useState(0)
    const [query, setQuery] = useState("")
    const search = async (q) => {
        try {
            if (q === "") return
            const res = await fetch(`/api/search/${q}/${searchNum}`)
            const data = await res.json()
            if (searchNum === 0) {
                setUserData(data[0])
            } else {
                const updateData = userData
                data[0].map((element) => {
                    updateData.push(element)
                })
                setUserData(updateData)
            }

            if (data[1] > searchNum) {
                setSearchNum(searchNum + 20)
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        setSearchNum(0)
    }, [query])


    const dispatch = useDispatch()

    const uid = useSelector((state) => state.registration.userData.uid)

    const addRecent = async (recent) => {
        try {
            const recentData = {
                uid: uid,
                recent: recent
            }
            await fetch("/api/create-recent", {
                method: "POST",
                body: JSON.stringify(recentData),
                headers: {
                    "Content-Type": "application/json"
                }
            })

        } catch (e) {
            console.error("Error while adding recent Users")
        }
    }

    return (
        <>
            <div
                id="search-nav"
                className="invisible fixed bottom-0 right-0 top-0 z-[1045] flex w-96 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
                tabIndex="-1"
                aria-labelledby="offcanvasRightLabel"
                data-te-offcanvas-init>
                <div className="flex items-center justify-between p-4">
                    <h5
                        className="mb-0 font-semibold leading-normal"
                        id="offcanvasRightLabel">
                        Search
                    </h5>
                    <button
                        onClick={ closeSearch }
                        type="button"
                        className="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    >
                        <span
                            className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </button>
                    {/* Search bar */ }
                </div>
                <div className="m-4">
                    <input
                        type="search"
                        onChange={ (e) => { setQuery(e.target.value); search(e.target.value) } }
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search Users" />
                </div>
                <div className="offcanvas-body flex-grow overflow-y-auto hidden-scroll p-4">
                    {/* User Listing Here  */ }

                    <div className="container my-16 mx-auto md:px-6">
                        <section className="mb-32 text-center">
                            <div className="flex flex-wrap gap-8 justify-center">

                                { userData.length > 0 && userData.map((element, i) => (
                                    <div key={ i } className="mb-2">
                                        <div onClick={ () => { dispatch(addRecentUser({ _id: element._id, name: element.name, pic: element.pic })); addRecent(element._id) } } className=" rounded-full overflow-hidden w-[100px] h-[100px]">
                                            <img src={ element.pic ? element.google && element.google == true ? element.pic : `/api/read-user-img/${element.pic}` : userImg }
                                                className="mx-auto mb-4 cursor-pointer rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                        </div>
                                        <p className="mb-2 font-bold">{ element.name }</p>
                                    </div>
                                )) }

                            </div>
                            { userData.length % 20 === 0 && <button onClick={ () => { query === "" ? fetchUsers() : search(query) } } type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">View more</button> }
                        </section>
                    </div>
                    {/* User Listing end */ }
                </div>
            </div>
        </>
    )
}

export default Search