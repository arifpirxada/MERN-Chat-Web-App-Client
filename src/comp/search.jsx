function Search() {

    const closeSearch = () => {
        document.getElementById("search-nav").classList.add("invisible")
        document.getElementById("search-nav").classList.add("translate-x-full")
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
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        id="exampleSearch"
                        placeholder="Search Users" />
                </div>
                <div className="offcanvas-body flex-grow overflow-y-auto hidden-scroll p-4">
                    {/* User Listing Here  */ }

                    <div className="container my-16 mx-auto md:px-6">
                        <section className="mb-32 text-center">
                            <div className="flex flex-wrap gap-8 justify-center">
                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />

                                    <p className="mb-2 font-bold">John Doe</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">Co-founder</p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/5.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />

                                    <p className="mb-2 font-bold">Lisa Ferrol</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">Web designer</p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/6.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Maria Smith</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Senior consultant
                                    </p>
                                </div>
                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/7.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Agatha Bevos</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">Co-founder</p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Darren Randolph</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Marketing expert
                                    </p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/9.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Soraya Letto</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">SEO expert</p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/10.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Maliha Welch</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">Web designer</p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/11.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Zeynep Dudley</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">Web developer</p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/12.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Avaya Hills</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">Copywritter</p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/13.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Thierry Fischer</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Senior consultant
                                    </p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/14.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Aisling Sheldon</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">
                                        Senior developer
                                    </p>
                                </div>

                                <div className="mb-12">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/15.jpg"
                                        className="mx-auto mb-4 rounded-full shadow-lg dark:shadow-black/20 max-w-[100px]" alt="" />
                                    <p className="mb-2 font-bold">Ayat Black</p>
                                    <p className="text-neutral-500 dark:text-neutral-300">Web designer</p>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* User Listing end */ }
                </div>
            </div>
        </>
    )
}

export default Search