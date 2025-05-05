import logo from "../img/logo.png";
import { useDispatch } from "react-redux"
import { changeLogStatus } from "../actions/actions"
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from "jwt-decode"

function Login() {

    const dispatch = useDispatch()
    const authorize = async () => {
        const res = await fetch("/api/authorize")
        const data = await res.json()
        if (data.message === "logged in") {
            dispatch(changeLogStatus(data.userData))
        }
    }

    useEffect(() => {
        authorize()
    }, [])

    // Login func
    const loginUser = async (e) => {
        e.preventDefault()

        const email = document.getElementById("log-email").value
        const password = document.getElementById("log-pass").value
        const mesBox = document.getElementById("log-message")

        if (email === "" || password === "") {
            mesBox.innerHTML = "Please provide email & password!"
            mesBox.parentNode.classList.remove("opacity-0")
            setTimeout(() => {
                mesBox.parentNode.classList.add("opacity-0")
            }, 4000);
            return
        }

        const userData = {
            email: email,
            password: password
        }

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        mesBox.innerHTML = data.message
        mesBox.parentNode.classList.remove("opacity-0")
        setTimeout(() => {
            mesBox.parentNode.classList.add("opacity-0")
        }, 4000);

        if (data.message === "login successful") {
            authorize()
        }
    }

    // signup here

    const signupUser = async (e) => {
        e.preventDefault()

        const name = document.getElementById("name").value
        const email = document.getElementById("sign-email").value
        const password = document.getElementById("sign-pass").value
        const mesBox = document.getElementById("sign-message")

        if (name === "" || email === "" || password === "") {
            mesBox.innerHTML = "Please fill all the fields!"
            mesBox.parentNode.classList.remove("opacity-0")
            setTimeout(() => {
                mesBox.parentNode.classList.add("opacity-0")
            }, 4000);
            return
        }

        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!emailPattern.test(email)) {
            mesBox.innerHTML = "Please provide a valid Email"
            mesBox.parentNode.classList.remove("opacity-0")
            setTimeout(() => {
                mesBox.parentNode.classList.add("opacity-0")
            }, 4000);
            return
        }

        const userData = {
            name: name,
            email: email,
            password: password
        }

        const res = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        mesBox.innerHTML = data.message
        mesBox.parentNode.classList.remove("opacity-0")
        setTimeout(() => {
            mesBox.parentNode.classList.add("opacity-0")
        }, 4000);

        if (data.message === "Insertion successful") {
            authorize()
        }
    }

    const openSignupForm = (e) => {
        e.preventDefault()
        document.getElementById("login-form").classList.add("opacity-0")
        setTimeout(() => {
            document.getElementById("login-form").classList.add("hidden")
            document.getElementById("signup-form").classList.remove("hidden")
            document.getElementById("signup-form").classList.remove("opacity-0")
        }, 200);
    }

    const openLoginForm = (e) => {
        e.preventDefault()
        document.getElementById("signup-form").classList.add("opacity-0")
        setTimeout(() => {
            document.getElementById("signup-form").classList.add("hidden")
            document.getElementById("login-form").classList.remove("hidden")
            document.getElementById("login-form").classList.remove("opacity-0")
        }, 200);
    }

    const toggleLogPass = () => {
        const logPass = document.getElementById("log-pass")
        if (logPass.type === "password") {
            logPass.type = "text"
        } else {
            logPass.type = "password"
        }
    }

    const toggleSignPass = () => {
        const signPass = document.getElementById("sign-pass")
        if (signPass.type === "password") {
            signPass.type = "text"
        } else {
            signPass.type = "password"
        }
    }

    const onSuccess = async (response) => {
        const mesBox = document.getElementById("sign-message")
        const profile = jwt_decode(response.credential)
        const userData = {
            name: profile.name,
            email: profile.email,
            pic: profile.picture
        }

        const res = await fetch("/api/google-signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        mesBox.innerHTML = data.message
        mesBox.parentNode.classList.remove("opacity-0")
        setTimeout(() => {
            mesBox.parentNode.classList.add("opacity-0")
        }, 4000);

        if (data.message === "Insertion successful" || data.message === "Login successful") {
            authorize()
        }
    }
    const onError = () => {
        console.log("success")
    }

    return (
        <>
            <section className="h-screen bg-[#F4F7FF] py-16">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="shadow-xl border max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-12 px-10 sm:px-12 md:px-[60px]">
                                <div className="mb-10 text-center">
                                    <div className="inline-block max-w-[50px] mx-auto">
                                        <img src={ logo } alt="logo" />
                                    </div>
                                </div>
                                {/* Login Here  */ }
                                <form id="login-form" className="hidden opacity-0 transition-all duration-200 ease-linear">
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            id="log-email"
                                            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            id="log-pass"
                                            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6 block min-h-[1.5rem] pl-[1.5rem] text-start">
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox"
                                            onChange={ toggleLogPass }
                                            id="showpass" />
                                        <label
                                            className="inline-block select-none pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="showpass">
                                            Show password
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="submit"
                                            value="Log in"
                                            onClick={ loginUser }
                                            className="w-full rounded-md border border-primary py-3 px-5 bg-blue-700 text-base text-white cursor-pointer hover:bg-opacity-90 transition"
                                        />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <GoogleLogin onSuccess={ onSuccess } onError={ onError } />
                                    </div>
                                    <div className="bg-orange-100 opacity-0 transition border-l-4 min-h-[40px] border-orange-500 text-orange-700 p-2 mb-2" role="alert">
                                        <p id="log-message"></p>
                                    </div>
                                    <p className="text-base text-[#adadad]">
                                        Not a member yet?&nbsp;
                                        <button onClick={ openSignupForm } className="text-primary hover:underline">Sign Up</button>
                                    </p>
                                </form>
                                {/* Signup Here  */ }

                                <form id="signup-form" className="transition-all duration-200 ease-linear">
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            id="name"
                                            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            id="sign-email"
                                            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            id="sign-pass"
                                            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-6 block min-h-[1.5rem] pl-[1.5rem] text-start">
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox"
                                            onChange={ toggleSignPass }
                                            id="showpass2" />
                                        <label
                                            className="inline-block pl-[0.15rem] select-none hover:cursor-pointer"
                                            htmlFor="showpass2">
                                            Show password
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="submit"
                                            value="Sign Up"
                                            onClick={ signupUser }
                                            className="w-full rounded-md border border-primary py-3 px-5 bg-blue-700 text-base text-white cursor-pointer hover:bg-opacity-90 transition"
                                        />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <GoogleLogin onSuccess={ onSuccess } onError={ onError } />
                                    </div>
                                    <div className="bg-orange-100 opacity-0 transition border-l-4 min-h-[40px] border-orange-500 text-orange-700 p-2 mb-2" role="alert">
                                        <p id="sign-message"></p>
                                    </div>
                                    <p className="text-base text-[#adadad]">
                                        Already a member?&nbsp;
                                        <button onClick={ openLoginForm } className="text-primary hover:underline">login</button>
                                    </p>
                                </form>
                                {/* signup End  */ }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
