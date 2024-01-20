"use client";
import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import Loader from "@/components/loader";
import { signIn, signOut, useSession } from "next-auth/react";
import handler from "@/app/api/getAccessToken";

import toast from 'react-hot-toast';

const Signup = () => {
 
  const session = useSession();
 
  
  const router = useRouter();

  const [error, setError] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isLoad, setLoad] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[a-zA-Z\s]+$/
;

const validateInput = (name, value) => {
  switch (name) {
    case "fullname":
      return value.trim() ?(nameRegex.test(value)?  "": "Only Alphabets! ") : "Full Name is required";
    case "email":
      return value.trim() ? (emailRegex.test(value) ? "" : "Invalid email address!") : "Email is required!";
      case "password":
        return value.trim()
          ? passwordRegex.test(value)
            ? ""
            : generatePasswordErrorMessage(value)
          : "Password is required!";
    default:
      return "";
  }
};

const generatePasswordErrorMessage = (value) => {
  const errors = [];
  
  if (!/(?=.*[a-z])/.test(value)) {
    errors.push(" one lowercase letter");
  }
  
  if (!/(?=.*[A-Z])/.test(value)) {
    errors.push(" one uppercase letter");
  }
  
  if (!/(?=.*\d)/.test(value)) {
    errors.push(" one digit");
  }
  
  if (!/(?=.*[@$!%*?&])/.test(value)) {
    errors.push(" one special character");
  }
  
  if (value.length < 8) {
    errors.push(" 8 characters long");
  }

  return `at least ${errors.join(", ")}.`;
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
        errors[name] = errorMessage;
      }
    });

    if (Object.keys(errors).length === 0) {
      setLoad(true);
      try {
        const response = await axios.post(
          "https://connectify-app.onrender.com/api/v1/auth/register",
          {
            fullname: inputs.fullname,
            email: inputs.email,
            password: inputs.password,
          }
        );

       
        setLoad(false);
       
        if (response.data.success) {
          toast.success("OTP sent successfully");
          localStorage.setItem('email',JSON.stringify(inputs.email))
          router.push( '/signup/verify/details');
        } else {
          
          setLoad(false);
          setError(response.data)
        }
      } catch (error) {
        
        setError({
          ...error,
          email: error.response?.data?.message || "An error occurred",
        });
        setLoad(false);
      }
    } else {
      setError(errors);
    }
  };
  
  const handleParentDivClick = () => {
   
    handleSubmit(new Event('submit'));
  };
 
  const verify = async () => {
    const formData = new FormData();

    if (session.status === "authenticated") {
      console.log('f')
      setLoad(true);
      formData.append('token', session.data.accessToken);
      try {
        const response = await axios.post("https://connectify-app.onrender.com/api/v1/auth/oauthGoogle", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    }
  };
  const handleGoogleSignup = async () => {
    // Perform Google signup
    const googleSignInResponse = await signIn("google");

    // Check if Google signup was successful
    if (googleSignInResponse?.error) {
      console.log("Google signup failed:", googleSignInResponse.error);
    } else {
      // If Google signup was successful, call the verify function
      await verify();
    }
  };
        
      
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-[3.9vh] text-[#F5FEF9] flex flex-col mob:gap-[8px]">
        <div className="label w-[100%] h-[11.9vh] pt-[3.8vh] pb-[3.5vh] relative mob:h-[8vh] mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[4.5vw]">
          <input
            className="bg-transparent  h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[18px]"
            required
            type="text"
            name="fullname"
            value={inputs.fullname}
            onChange={handleInputChange}
            placeholder="Full Name"
            maxLength={25}
          />
          {inputs.fullname?<div className="tex absolute top-[0px] text-[18px] font-[500] mob:text-[12px] ">Full name</div>:null}
          
          <hr className="border-b-2 border-[#9A9DA1] "style={
              error.fullname
                ? { borderColor: "#F41F41" }
                : { borderColor: "#9A9DA1" }
            } />
          {error.fullname ? (
            <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide mob:text-[12px]">
              {error.fullname}
            </p>
          ) : null}
        </div>
        <div className="label relative w-[100%] h-[11.9vh] pt-[3.8vh] pb-[3.5vh] mob:h-[8vh]  mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[18px]">
          <input
            className="bg-transparent h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[18px]"
            required
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="Email"
            maxLength={40}
          />
          {inputs.email?<div className="tex absolute top-[0px] text-[18px] font-[500] mob:text-[12px] ">Email</div>:null}
          <hr
            className="border-b-2 border-[#9A9DA1] "
            style={
              error.email
                ? { borderColor: "#F41F41" }
                : { borderColor: "#9A9DA1" }
            }
          />
          {error.email ? (
            <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide mob:text-[12px]">
              {error.email}
            </p>
          ) : null}
        </div>
        <div className="label relative w-[100%] h-[11.9vh] pt-[3.8vh] pb-[3.5vh] mob:h-[8vh] mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[18px]">
          <input
            className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[18px]"
            required
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            placeholder="Password"
            maxLength={25}
          />
          {inputs.password?<div className="tex absolute top-[0px] text-[18px] font-[500] mob:text-[12px]">Password</div>:null}
          <hr
            className="border-b-2 border-[#9A9DA1] "
            style={
              error.password
                ? { borderColor: "#F41F41" }
                : { borderColor: "#9A9DA1" }
            }
          ></hr>
          {error.password ? (
            <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide mob:text-[12px]">
              {error.password}
            </p>
          ) : null}
        </div>
      </div>
      <div className=" mt-[6.3vh] flex flex-col gap-[3.8vh]">
        <div onClick={handleParentDivClick} className="btn w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center" >
        {!isLoad?<button type="submit"   className=" font-FontPro  text-[24px] font-semibold">
            Next
          </button>:<Loader/>}
        </div>
        <div className="btn w-full h-[6.9vh] bg-transparent rounded-xl border-[3px] border-solid border-[#F5FEF9] m-auto flex justify-center items-center">
          <button type="button" className=" flex gap-[16px]" onClick={handleGoogleSignup}>
         <img className=" self-center" src="/google.svg"/>
         <span className=" font-sans text-[24px] font-semibold text-[#FFF] whitespace-nowrap " onClick={()=>signIn("google")}> Signup with google</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
