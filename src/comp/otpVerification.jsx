import logo from "../img/logo.png";
import { useSelector } from 'react-redux'
import { useRef } from "react";

function OtpVerification() {

    const userId = useSelector((state) => state.registration.userData.uid)
    const userCorrectOtp = useSelector((state) => state.registration.userData.otp)
    const otpRef = useRef(null)
    const messageRef = useRef(null)

    const verifyOtp = async (e) => {
        e.preventDefault()
        const userOtp = parseInt(otpRef.current.value)

        if (isNaN(userOtp)) {
            messageRef.current.innerText = "Wrong otp!"
            messageRef.current.classList.toggle("opacity-0")

            setTimeout(() => {
                messageRef.current.classList.toggle("opacity-0")
            }, 4000);
            return
        }

        e.target.value = "Verifing..."

        if (userOtp != userCorrectOtp) {
            messageRef.current.innerText = "Wrong otp!"
            messageRef.current.classList.toggle("opacity-0")

            setTimeout(() => {
                messageRef.current.classList.toggle("opacity-0")
            }, 4000);
            e.target.value = "Verify"
        } else {
            try {
                const res = await fetch(`/api/otp-verification/${userId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json()
                e.target.value = "Verify"

                if (data.message === "verified") {
                    window.location.href = window.location.href;
                } else {
                    messageRef.current.innerText = "Some error occured. Please try later!"
                    messageRef.current.classList.toggle("opacity-0")

                    setTimeout(() => {
                        messageRef.current.classList.toggle("opacity-0")
                    }, 4000);
                }
            } catch (e) {
                console.error("An error occured while verifing otp please try later!")
            }
        }
    }

    return (
        <>
            <section className="h-screen bg-[#F4F7FF] py-16">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="shadow-xl border max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-12 px-10 sm:px-12 md:px-[60px]">
                                <div className="mb-8 text-center">
                                    <div className="inline-block max-w-[50px] mx-auto">
                                        <img src={ logo } alt="logo" />
                                    </div>
                                </div>
                                {/* Otp verify Here  */ }
                                <div className="bg-orange-100 min-h-[40px] border-orange-500 text-orange-700 p-2 mb-2" role="alert">
                                    <p>otp verification: We have sent an otp to your email. Please enter the otp and verify your email!</p>
                                </div>
                                <form className="transition-all duration-200 ease-linear">
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Enter otp"
                                            ref={ otpRef }
                                            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="submit"
                                            value="Verify"
                                            onClick={ verifyOtp }
                                            className="w-full rounded-md border border-primary py-3 px-5 bg-blue-700 text-base text-white cursor-pointer hover:bg-opacity-90 transition"
                                        />
                                    </div>
                                    <p className="opacity-0 transition-all text-orange-700" ref={ messageRef }></p>
                                </form>
                                {/* verify End  */ }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default OtpVerification;