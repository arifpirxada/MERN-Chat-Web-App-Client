import logo from "../img/logo.png"
import userImg from "../img/user.jpg"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../actions/actions"

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

    return (
        <>
            <div onClick={ toggleRecent } id="sidenav-bg" className="opacity-0 z-40 hidden w-full h-full bg-[rgba(0,0,0,0.2)] fixed transition-all duration-200 ease-linear"></div>
            <div onClick={ toggleProfile } id="profile-bg" className="opacity-0 z-40 hidden w-full h-full bg-transparent fixed transition-all duration-200 ease-linear"></div>
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
                        <span onClick={ openSearch }
                            className="input-group-text cursor-pointer flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
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
                                src={ userData && userData.pic ? `/api/read-user-img/${userData.pic}` : userImg }
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
                            <img id="profile-img" src={ userData && userData.pic ? `/api/read-user-img/${userData.pic}` : userImg }
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