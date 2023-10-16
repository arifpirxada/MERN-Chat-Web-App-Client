import logo from "../img/logo.png";
import { useSelector, useDispatch } from "react-redux"
import { signup, login } from "../actions/actions"
import { useEffect } from "react";

function Login() {

    const logged = useSelector((state) => state.registration.logged)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(logged)
    }, [logged])

    // Login func
    const loginUser = (e) => {
        e.preventDefault()
        const userData = {
            email: "arif@gmail.com",
            password: "1234"
        }
        dispatch(login(userData))
    }

    const signupUser = (e) => {
        e.preventDefault()
        const userData = {
            email: "arif@gmail.com",
            password: "1234"
        }
        dispatch(signup(userData))
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

    return (
        <>
            <section className="h-screen bg-[#F4F7FF] py-16">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            {/* Login Here  */ }
                            <div className="shadow-xl border max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                                <div className="mb-10 text-center">
                                    <div className="inline-block max-w-[50px] mx-auto">
                                        <img src={ logo } alt="logo" />
                                    </div>
                                </div>
                                <form id="login-form" className="transition-all duration-200 ease-linear">
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
                                    <div className="mb-10">
                                        <input
                                            type="submit"
                                            value="Log in"
                                            onClick={ loginUser }
                                            className="w-full rounded-md border border-primary py-3 px-5 bg-blue-700 text-base text-white cursor-pointer hover:bg-opacity-90 transition"
                                        />
                                    </div>
                                    <p className="text-base text-[#adadad]">
                                        Not a member yet?&nbsp;
                                        <button onClick={ openSignupForm } className="text-primary hover:underline">Sign Up</button>
                                    </p>
                                </form>
                                {/* Signup Here  */ }

                                <form id="signup-form" className="hidden opacity-0 transition-all duration-200 ease-linear">
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
                                    <div className="mb-10">
                                        <input
                                            type="submit"
                                            value="Sign Up"
                                            onClick={ signupUser }
                                            className="w-full rounded-md border border-primary py-3 px-5 bg-blue-700 text-base text-white cursor-pointer hover:bg-opacity-90 transition"
                                        />
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

            {/* <p className="text-base mb-6 text-[#adadad]">Connect With</p>
                <ul className="flex justify-between -mx-2 mb-12">
                  <li className="px-2 w-full">
                    <a
                      href="javascript:void(0)"
                      className="
                        flex
                        h-11
                        items-center
                        justify-center
                        rounded-md
                        bg-[#4064AC]
                        hover:bg-opacity-90
                        ">
                      <svg
                        width="10"
                        height="20"
                        viewBox="0 0 10 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.29878 8H7.74898H7.19548V7.35484V5.35484V4.70968H7.74898H8.91133C9.21575 4.70968 9.46483 4.45161 9.46483 4.06452V0.645161C9.46483 0.290323 9.24343 0 8.91133 0H6.89106C4.70474 0 3.18262 1.80645 3.18262 4.48387V7.29032V7.93548H2.62912H0.747223C0.359774 7.93548 0 8.29032 0 8.80645V11.129C0 11.5806 0.304424 12 0.747223 12H2.57377H3.12727V12.6452V19.129C3.12727 19.5806 3.43169 20 3.87449 20H6.47593C6.64198 20 6.78036 19.9032 6.89106 19.7742C7.00176 19.6452 7.08478 19.4194 7.08478 19.2258V12.6774V12.0323H7.66596H8.91133C9.2711 12.0323 9.54785 11.7742 9.6032 11.3871V11.3548V11.3226L9.99065 9.09677C10.0183 8.87097 9.99065 8.6129 9.8246 8.35484C9.76925 8.19355 9.52018 8.03226 9.29878 8Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="px-2 w-full">
                    <a
                      href="javascript:void(0)"
                      className="
                        flex
                        h-11
                        items-center
                        justify-center
                        rounded-md
                        bg-[#1C9CEA]
                        hover:bg-opacity-90
                        ">
                      <svg
                        width="22"
                        height="16"
                        viewBox="0 0 22 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19.5516 2.75538L20.9 1.25245C21.2903 0.845401 21.3968 0.53229 21.4323 0.375734C20.3677 0.939335 19.3742 1.1272 18.7355 1.1272H18.4871L18.3452 1.00196C17.4935 0.344423 16.429 0 15.2935 0C12.8097 0 10.8581 1.81605 10.8581 3.91389C10.8581 4.03914 10.8581 4.22701 10.8935 4.35225L11 4.97847L10.2548 4.94716C5.7129 4.82192 1.9871 1.37769 1.38387 0.782779C0.390323 2.34834 0.958064 3.85127 1.56129 4.79061L2.76774 6.54403L0.851613 5.6047C0.887097 6.91977 1.45484 7.95303 2.55484 8.7045L3.5129 9.33072L2.55484 9.67515C3.15806 11.272 4.50645 11.9296 5.5 12.18L6.8129 12.4932L5.57097 13.2446C3.58387 14.4971 1.1 14.4031 0 14.3092C2.23548 15.6869 4.89677 16 6.74194 16C8.12581 16 9.15484 15.8748 9.40322 15.7808C19.3387 13.7143 19.8 5.8865 19.8 4.32094V4.10176L20.0129 3.97652C21.2194 2.97456 21.7161 2.44227 22 2.12916C21.8935 2.16047 21.7516 2.22309 21.6097 2.2544L19.5516 2.75538Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="px-2 w-full">
                    <a
                      href="javascript:void(0)"
                      className="
                        flex
                        h-11
                        items-center
                        justify-center
                        rounded-md
                        bg-[#D64937]
                        hover:bg-opacity-90
                        ">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                </ul> */}
            {/* <a
                  href="javascript:void(0)"
                  className="
                  text-base
                  inline-block
                  mb-2
                  text-[#adadad]
                  hover:underline hover:text-primary
                  ">
                  Forget Password?
                </a> */}
        </>
    );
}

export default Login;
