import logo from "../img/logo.png"

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

    return (
        <>
            <div onClick={ toggleRecent } id="sidenav-bg" className="opacity-0 z-40 hidden w-full h-full bg-[rgba(0,0,0,0.2)] fixed transition-all duration-200 ease-linear"></div>
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

                        <div
                            className="relative"
                            data-te-dropdown-ref
                            data-te-dropdown-alignment="end">
                            <ul
                                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                                aria-labelledby="dropdownMenuButton1"
                                data-te-dropdown-menu-ref>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Another action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Something else here</a
                                    >
                                </li>
                            </ul>
                        </div>

                        <div
                            className="relative"
                            data-te-dropdown-ref
                            data-te-dropdown-alignment="end">
                            <a
                                className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                                href="#"
                                id="dropdownMenuButton2"
                                role="button"
                                data-te-dropdown-toggle-ref
                                aria-expanded="false">
                                <img
                                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                                    className="rounded-full h-6 w-6"
                                    alt=""
                                    loading="lazy" />
                            </a>
                            <ul
                                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                                aria-labelledby="dropdownMenuButton2"
                                data-te-dropdown-menu-ref>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Another action</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        href="#"
                                        data-te-dropdown-item-ref
                                    >Something else here</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar