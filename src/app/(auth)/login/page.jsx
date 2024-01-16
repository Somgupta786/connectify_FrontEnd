
"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import Loader from "@/components/loader";
const Page = () => {
  const router = useRouter();

  const [error, setError] = useState({
    
    email: "",
    password: "",
  });
  const [inputs, setInputs] = useState({
    
    email: "",
    password: "",
  });
  const [isLoad, setLoad] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validateInput = (name, value) => {
  switch (name) {
    case "fullname":
      return value.trim() ? "" : "Full Name is required";
    case "email":
      return value.trim() ? (emailRegex.test(value) ? "" : "Uh-oh! That's not a valid email.") : "Email is required!";
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
      setLoad(true)
      console.log("ff")
      try {
        const response = await axios.post(
          "https://connectify-app.onrender.com/api/v1/auth/login",
          {
            email: inputs.email,
            password: inputs.password,
          }
        );

       
        setLoad(false);
       
        if (response.data) {
          console.log(response.data)
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
  return (
    <form  onSubmit={handleSubmit} className=" w-[544px] flex flex-col absolute left-[11.11vw] top-[18vh] lg:left-1/2 lg:transform lg:-translate-x-1/2 sm:w-[86.7vw] mob:top-[19.3vh]">
      <div className=" text-[#fff] font-sans text-[2.5rem] font-semibold">Login</div>
      <div className=" flex flex-col gap-[8px] mt-[3.8vh] text-[#F5FEF9] mob:gap-[14px] mob:mt-[8vh] ">
        <div className="label relative w-[100%] h-[11.9vh] pt-[3.8vh] pb-[3.5vh] mob:h-[8vh] mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[4.5vw]">
          <input
           className="bg-transparent h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[4.5vw]"
            required
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="Email"
            maxLength={40}
          />
          {inputs.email?<div className="tex absolute top-[0px] text-[18px] font-[500] mob:text-[3.3vw]">Email</div>:null}
          <hr
            className="border-b-2 border-[#9A9DA1] "
            style={
              error.email
                ? { borderColor: "#F41F41" }
                : { borderColor: "#9A9DA1" }
            }
          />
          {error.email ? (
            <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide mob:text-[3.3vw]">
              {error.email}
            </p>
          ) : null}
        </div>
        <div className="label relative w-[100%] h-[11.9vh] pt-[3.8vh] pb-[3.5vh]  mob:h-[8vh] mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[4.5vw]">
          <input
          className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[4.5vw]"
            required
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            placeholder="Password"
            maxLength={25}
          />
          {inputs.password?<div className="tex absolute top-[0px] text-[18px] font-[500] mob:text-[3.3vw] ">Password</div>:null}
          <hr
            className="border-b-2 border-[#9A9DA1] "
            style={
              error.password
                ? { borderColor: "#F41F41" }
                : { borderColor: "#9A9DA1" }
            }
          ></hr>
          {error.password ? (
            <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide mob:text-[3.3vw]">
              {error.password}
            </p>
          ) : null}
        </div>
      </div>
      <div className="btn text-[#35CCCD] font-sans text-base font-semibold leading-[145%] tracking-wider ml-auto mob:mt-[16px]" onClick={()=>router.push("/forgetPassword")}> Forgot Password?</div>
      <div className=" mt-[6.3vh] flex flex-col gap-[32px] mob:mt-[8vh]">
        <div onClick={handleParentDivClick} className="btn w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center" >
        {!isLoad?<button type="submit" className="font-sans text-[24px] font-semibold">
            NEXT
          </button>:<Loader/>}
        </div>
        <div className=" w-full h-[6.9vh] bg-transparent rounded-xl border-[3px] border-solid border-[#F5FEF9] m-auto flex justify-center items-center">
          <button type="submit" className=" flex gap-[16px]">
         <img className=" self-center" src="/google.svg"/>
         <span className=" font-sans text-[24px] font-semibold text-[#FFF] whitespace-nowrap "> Signin with google</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
