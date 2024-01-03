'use client'
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const Page = () => {
  const router = useRouter()
  const email = JSON.parse(localStorage.getItem('email'));
  
  
  const [code, setOTP] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(20);

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
    const value = e.target.value.replace(/\D/g, '').slice(0, 1);
    const updatedOTP = [...code];
    updatedOTP[index] = value;
    setOTP(updatedOTP);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } 
  };

  // const handleBackspace = (e, index) => {
  //   if (e.key === "Backspace" && index > 0) {
  //     inputRefs[index-1].current.focus();
      
  //   }
  // };

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
const verifyHandler = async(e)=>{
  e.preventDefault();
  const otp = code.join("");
  try {
    const response = await axios.post('https://connectify-app.onrender.com/api/v1/auth/verify-registration', {
      email:email,
    otp:otp
    });
    
   
    if (response.data) {
      console.log("fff")
      router.push("/signup/verify/details")
    }
  } catch(error){
      console.log(error)
  }
}
  return (
    <form onSubmit={verifyHandler}>
      <div className=" text-white font-sans text-[24px] font-semibold mt-[48px] flex flex-col gap-[40px]">
        <div>
          Verify yourself
          <div className="text-white font-sans text-[18px] font-medium line-height: 140%; /* 25.2px */ letter-spacing: 0.72px;">
            Beep-boop! Code dispatched.
          </div>
        </div>
        <div className="flex gap-[67px]">
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
              // onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}
        </div>
        <div className="text-[#35CCCD] font-sans text-base font-semibold leading-[145%] tracking-wider">Resend OTP</div>
      </div>
      <div className="w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center mt-[14vh]">
        <button type="submit" className="font-sans text-[24px] font-semibold">NEXT</button>
      </div>
    </form>
  );
};

export default Page;
