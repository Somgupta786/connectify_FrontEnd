

"use client";
import React, { useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
const Page = () => {
  const formRef = useRef()
  const router = useRouter();

  const [error, setError] = useState({
  });
  const [inputs, setInputs] = useState({  email: "", });
  const [isLoad, setLoad] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const validateInput = (name, value) => {
  switch (name) {
    case "email":
      return value.trim() ? (emailRegex.test(value) ? "" : "Uh-oh! That's not a valid email.") : "Email is required!";
    default:
      return "";
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));

    const errorMessage = validateInput(name, value);

    setError((prevError) => ({ ...prevError, [name]: errorMessage }));
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
   

   
    const errors = {};
    Object.keys(inputs).forEach((name) => {
      const errorMessage = validateInput(name, inputs[name]);
      if (errorMessage) {
        console.log(errorMessage)
        errors[name] = errorMessage;
      }
    });

    if (Object.keys(errors).length === 0) {
      setLoad(true)
      
      try {
        const response = await axios.post(
          "https://connectify-app.onrender.com/api/v1/auth/forgot-password",
          {
            email: inputs.email,
           
          }
        );

       
        setLoad(false);
       
        if (response.data.success) {
          toast.success("Otp Sent")
          localStorage.setItem('email',JSON.stringify(inputs.email))
          router.push("/forgetPassword/verify")
        } else {
          
          setLoad(false);
          setError(response.data)
        }
      } catch (error) {
        console.log(error.response.data.message)
        setError({
          ...error,
          email: error.response.data.message
        });
        setLoad(false);
      }
    } else {
      console.log("f")
      
    }
  };
  const clickHandler = ()=>{

    formRef.current.click();
   }
  return (
    <form onSubmit={handleSubmit} className="w-[544px] flex flex-col absolute left-[145px] top-[26vh] lg:left-1/2 lg:transform lg:-translate-x-1/2 sm:w-[86.7vw] mob:top-[28.7vh] ">
         <div className="tex text-white font-sans text-[40px] font-semibold mb-[16px] mob:leading-[48px]">Forgot <span className="mob:block">Password?</span> </div>
         <div className=" text-white font-sans text-[24px] font-semibold mob:text-[18px] mob:tracking-[0.64px] mob:leading-6">Enter you registered email</div>
         <div className="label relative w-[100%] h-[11.9vh] pt-[3.8vh] pb-[3.5vh] mt-[4.7vh] text-white ">
          <input
            className="bg-transparent h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="Email Adress"
            maxLength={40}
          />
          {inputs.email?<div className="tex absolute top-[0px] text-[18px] font-[500] ">Email</div>:null}
        <hr
            className="border-b-2 border-[#9A9DA1] "
            style={
              error.email
                ? { borderColor: "#F41F41" }
                : { borderColor: "#9A9DA1" }
            }
          />
           {error.email ? (
            <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide">
              {error.email}
            </p>
          ) : null}
        </div>
        <div onClick={clickHandler} className="btn w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center mt-[8.5vh] mob:mt-[25vh]">
          {!isLoad?<button ref={formRef} type="submit" className="font-sans text-[24px] font-semibold">
            NEXT
          </button>:<Loader/>}
        </div>
    </form>
  )
}

export default Page
