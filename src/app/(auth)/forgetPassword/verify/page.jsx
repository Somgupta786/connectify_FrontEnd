"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader";

const page = () => {
  const router = useRouter();
  const email =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("email"))
      : null;

  const [isLoad, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [code, setOTP] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const handleOTPChange = (e, index) => {
    setError("");
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const updatedOTP = [...code];
    updatedOTP[index] = value;
    setOTP(updatedOTP);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      inputRefs[index - 1].current.focus();
      const updatedOTP = [...code];
      updatedOTP[index] = "";
      setOTP(updatedOTP);
    }
  };
  const verifyHandler = async (e) => {
    setLoad(true);
    e.preventDefault();
    const otp = code.join("");
    try {
      const response = await axios.post(
        "https://connectify-app.onrender.com/api/v1/auth/verify-registration",
        {
          email: email,
          otp: otp,
        }
      );
      setLoad(false);

      if (response.data) {
        router.push("/signup/verify/details");
      }
    } catch (error) {
      setLoad(false);
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const resendHandler = async()=>{
    setCountdown(60);
    try{
 const response = await axios.post("https://connectify-app.onrender.com/api/v1/auth/resend-otp",
 {
   email: email,
       
 })
 if(response.data.success){
  setError(response.data.message)
 }
    }
    catch(error){
      
      setError(error.response.data.message);
      
    }
  }
  return (
    <form
      onSubmit={verifyHandler}
      className="w-[37.7%] flex flex-col absolute left-[145px] top-[18vh]"
    >
      <div className="text-white font-sans text-[40px] font-semibold">
        Forget Password
      </div>
      <div className=" text-white font-sans text-[24px] font-semibold  flex flex-col gap-[40px]">
        <div>
          Verify yourself
          <div
            className=" text-white font-sans text-[18px] font-medium line-height: 140%; /* 25.2px */
letter-spacing: 0.72px;"
          >
            Beep-boop! Code dispatched.
          </div>
        </div>
        <div className="flex relative gap-[67px]">
          {code.map((digit, index) => (
            <input
              className="otpBox flex justify-center items-center pl-[22px] text-[32px]"
              ref={inputRefs[index]}
              required
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(e, index)}
              style={error ? { borderColor: "#F41F41" } : null}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}

          {error ? (
            <p className="error text-[#F41F41] absolute bottom-[-30px]  font-sans text-[16px] font-medium leading-relaxed tracking-wide">
              {error}
            </p>
          ) : null}
        </div>
        {countdown > 0 ? (
          <div className="text-[#35CCCD] font-sans text-base font-semibold leading-[145%] tracking-wider ">
          Resend OTP in {countdown} seconds!
          </div>
        ) : (
          <div className="btn text-[#35CCCD] font-sans text-base font-semibold leading-[145%] tracking-wider " onClick={resendHandler}>
            Resend OTP
          </div>
        )}
      </div>
      <div className=" w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center mt-[14vh]">
        {!isLoad ? (
          <button type="submit" className="font-sans text-[24px] font-semibold">
            NEXT
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};

export default page;
