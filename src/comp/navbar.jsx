import logo from "../img/logo.png"
import userImg from "../img/user.jpg"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser, removeNotification, selectUser } from "../actions/actions"
import { useEffect } from "react"

function Navbar() {

    const toggleRecent = () => {
        document.getElementById("sidenav-bg").classList.toggle("hidden")
        document.getElementById("sidenav-bg").classList.toggle("opacity-0")
        document.getElementById("sidenav").classList.toggle("w-0")
        document.getElementById("sidenav").classList.toggle("w-72")
    }

    const openSearch = () => {
        document.getElementById("search-nav").classList.remove("invisible")
        document.getElementById("search-nav").classList.remove("translate-x-full")
        document.getElementById("search-bg").classList.toggle("hidden")
        document.getElementById("search-bg").classList.toggle("opacity-0")
    }
    const toggleProfile = () => {
        document.getElementById("profile-bg").classList.toggle("hidden")
        document.getElementById("profile-bg").classList.toggle("opacity-0")
        document.getElementById("profile-tab").classList.toggle("hidden")
        setTimeout(() => {
            document.getElementById("profile-tab").classList.toggle("translate-x-72")
        }, 10);
    }

    const userData = useSelector((state) => state.registration.userData)

    const uploadPic = async (e) => {
        const formData = new FormData()
        const file = e.target.files[0];
        const messBox = document.getElementById("image-message")

        if (!userData.uid) {
            messBox.innerHTML = "No user error occured."
            messBox.parentNode.classList.remove("hidden")
            messBox.parentNode.classList.add("flex")
            setTimeout(() => {
                messBox.parentNode.classList.remove("opacity-0")
            }, 10);

            setTimeout(() => {
                messBox.parentNode.classList.add("opacity-0")
                setTimeout(() => {
                    messBox.parentNode.classList.remove("flex")
                    messBox.parentNode.classList.add("hidden")
                }, 150);
            }, 4000);
            return
        }

        const contentTypeMap = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
        ];

        if (!contentTypeMap.includes(file.type.toLowerCase())) {
            messBox.innerHTML = "Unsupported file type."
            messBox.parentNode.classList.remove("hidden")
            messBox.parentNode.classList.add("flex")
            setTimeout(() => {
                messBox.parentNode.classList.remove("opacity-0")
            }, 10);

            setTimeout(() => {
                messBox.parentNode.classList.add("opacity-0")
                setTimeout(() => {
                    messBox.parentNode.classList.remove("flex")
                    messBox.parentNode.classList.add("hidden")
                }, 150);
            }, 4000);
            return
        }

        if (file.size > 5242880) {
            messBox.innerHTML = "Picture should be less than 5mb."
            messBox.parentNode.classList.remove("hidden")
            messBox.parentNode.classList.add("flex")
            setTimeout(() => {
                messBox.parentNode.classList.remove("opacity-0")
            }, 10);

            setTimeout(() => {
                messBox.parentNode.classList.add("opacity-0")
                setTimeout(() => {
                    messBox.parentNode.classList.remove("flex")
                    messBox.parentNode.classList.add("hidden")
                }, 150);
            }, 4000);
            return
        }

        formData.append("id", userData.uid)
        formData.append("user-img", file)

        const res = await fetch("/api/update-user-img", {
            method: "PATCH",
            body: formData
        })
        const data = await res.json()

        if (data.message === "Updation successful") {
            const profile = document.getElementById('profile-img');
            const topProfile = document.getElementById("top-profile-img");

            profile.src = URL.createObjectURL(e.target.files[0]);
            profile.onload = function () {
                URL.revokeObjectURL(profile.src)
            }
            topProfile.src = URL.createObjectURL(e.target.files[0]);
            topProfile.onload = function () {
                URL.revokeObjectURL(topProfile.src)
            }
        }
    };

    const dispatch = useDispatch()

    const logout = async () => {
        try {
            const res = await fetch("/api/logout")
            const data = await res.json()
            if (data.message === "Logout successful") {
                dispatch(logoutUser())
            }
        } catch (e) {
            alert("An error occured while logging out")
        }
    }

    const toggleNotifications = () => {
        document.getElementById("notifications").classList.toggle("hidden")
        document.getElementById("notifications").classList.toggle("opacity-0")
        document.getElementById("notification-bg").classList.toggle("hidden")
        document.getElementById("notification-bg").classList.toggle("opacity-0")
    }

    const notificationArr = useSelector((state) => state.notifications)

    const shiftSelectedRemoveNotify = (element) => {
        new Promise((resolve, reject) => {
            dispatch(selectUser({ _id: element._id, name: element.name, pic: element.pic }))
            resolve()
        }).then(() => {
            dispatch(removeNotification(element._id))
            toggleNotifications()
        })
    }

    return (
        <>
            <div onClick={ toggleRecent } id="sidenav-bg" className="opacity-0 z-40 hidden w-full h-full bg-[rgba(0,0,0,0.2)] fixed transition-all duration-200 ease-linear"></div>
            <div onClick={ toggleProfile } id="profile-bg" className="opacity-0 z-40 hidden w-full h-full bg-transparent fixed transition-all duration-200 ease-linear"></div>
            <div onClick={ toggleNotifications } id="notification-bg" className="opacity-0 z-40 hidden w-full h-full bg-transparent fixed transition-all duration-200 ease-linear"></div>
            <div onClick={ () => {
                document.getElementById("search-nav").classList.add("invisible")
                document.getElementById("search-nav").classList.add("translate-x-full")
                document.getElementById("search-bg").classList.toggle("hidden")
                document.getElementById("search-bg").classList.toggle("opacity-0")
            } } id="search-bg" className="opacity-0 z-40 hidden w-full h-full bg-transparent fixed transition-all duration-200 ease-linear"></div>
            <nav
                id="top-nav"
                className="lg:left-72 transition-all duration-200 ease-linear flex-no-wrap relative flex my-nav items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <button
                        onClick={ toggleRecent }
                        className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-te-collapse-init
                        data-te-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="[&>svg]:w-7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-7 w-7">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>
                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContent1"
                        data-te-collapse-item>
                        <a
                            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                            href="#">
                            <img
                                className="h-8 rounded-lg"
                                src={ logo }
                                alt="TE Logo"
                                loading="lazy" />
                        </a>
                    </div>

                    <div className="relative flex items-center">
                        <div
                            className="hidden-arrow cursor-pointer mr-2 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400">
                            <div onClick={ toggleNotifications }>
                                <span className="[&>svg]:w-5">
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
                                { notificationArr.length > 0 ?
                                    <span
                                        className="absolute -mt-6 ml-2.5 rounded-full bg-red-500 px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                                    >{ notificationArr.length }</span> : "" }
                            </div>
                            <div
                                id="notifications"
                                className="absolute opacity-0 hidden transition-all top-8 right-10 z-50 m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                            >
                                <div>

                                    <div className="w-full max-w-xs p-4 cursor-context-menu text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300" role="alert">
                                        <div className="flex items-center mb-3">
                                            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Notifications</span>
                                            <button onClick={ toggleNotifications } type="button" className="ml-auto cursor-pointer -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                            </button>
                                        </div>
                                        { notificationArr && notificationArr.length > 0 ? notificationArr.map((element, i) => (
                                            <div key={ i } onClick={ () => { shiftSelectedRemoveNotify(element) } } className="flex items-center my-2 cursor-pointer">
                                                <div className="relative inline-block shrink-0">
                                                    <img className="w-12 h-12 rounded-full" src={ element.pic ?  element.google && element.google == true ? element.pic : `/api/read-user-img/${element.pic}` : userImg } alt="Jese Leos image" />
                                                    <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                                                        <svg className="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                                                            <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor" />
                                                            <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="ml-3 text-sm font-normal">
                                                    <div className="text-sm anywhere-break font-semibold text-gray-900 dark:text-white">{ element.name }</div>
                                                    <div className="text-sm anywhere-break font-normal">{ element.message }</div>
                                                </div>
                                            </div>
                                        )) : <div className="flex items-center my-2">
                                            <div className=" text-sm font-normal">
                                                <div className="text-sm anywhere-break font-semibold text-gray-900 dark:text-white">No new messages</div>
                                                <div className="text-sm anywhere-break font-normal">Up to date</div>
                                            </div>
                                        </div> }
                                    </div>

                                </div>
                            </div>
                        </div>
                        <span onClick={ openSearch }
                            className="input-group-text mr-1 cursor-pointer flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                            id="basic-addon2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                        <div className="rounded-full overflow-hidden w-6 h-6">
                            <img
                                id="top-profile-img"
                                onClick={ toggleProfile }
                                src={ userData && userData.pic ?  userData.google && userData.google == true ? userData.pic : `/api/read-user-img/${userData.pic}` : userImg }
                                className="rounded-full w-6 cursor-pointer"
                                alt=""
                                loading="lazy" />
                        </div>

                    </div>
                </div>
            </nav>

            {/* Profile Here */ }

            <div id="profile-tab" className="translate-x-72 hidden transition-all text-center w-72 absolute z-[80] text-white right-0">
                <div
                    className="block h-full rounded-bl-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-700">
                    <div className="flex justify-center">
                        <div className="rounded-full overflow-hidden w-[150px] h-[150px]">
                            <img id="profile-img" src={ userData && userData.pic ? userData.google && userData.google == true ? userData.pic : `/api/read-user-img/${userData.pic}` : userImg }
                                className="mx-auto shadow-lg dark:shadow-black/20 w-[150px]" alt="Avatar" />
                        </div>
                    </div>
                    <div className="p-6">
                        <label className="block mb-4">
                            <div className="block w-full mr-4 py-2 px-4 rounded-full border-0 text-sm font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 cursor-pointer">Choose profile photo</div>
                            <input id="update-profile-image" type="file" accept=".jpg, .jpeg, .png, .webp" onChange={ uploadPic } className="hidden w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                        </label>
                        <div className="hidden opacity-0 transition-all items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div id="image-message" className="font-medium"></div>
                        </div>
                        { userData && userData.name && <h5 className="mb-2 text-lg font-bold">{ userData.name }</h5> }
                        { userData && userData.email && <p className="mb-4  ">{ userData.email }</p> }
                        <button onClick={ logout } className="mb-2 hover:text-red-400">Logout</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar