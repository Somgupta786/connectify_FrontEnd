"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "@/components/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
    const router = useRouter()
    const email =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("email"))
      : null;
  const [isLoad, setLoad] = useState(false);
  const [error, setError] = useState({
    password: "",
    confirm:""
  });
  const [inputs, setInputs] = useState({
    password: "",
    confirm:""
  });
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateInput = (name, value) => {
    switch (name) {
      case "password":
        return value.trim()
          ? passwordRegex.test(value)
            ? ""
            : generatePasswordErrorMessage(value)
          : "Password is required";
      case "confirm":
        return value.trim()
          ? value === inputs.password
            ? ""
            : "Passwords do not match"
          : "Confirm Password is required";
      default:
        return "";
    }
  };
  
  useEffect(() => {
    const value = inputs.confirm;
    value.trim()
      ? value === inputs.password
        ? setError((prevError) => ({ ...prevError, confirm: "" }))
        : setError((prevError) => ({ ...prevError, confirm: "Passwords do not match" }))
      : setError((prevError) => ({ ...prevError, confirm: "" }));
  }, [inputs.password, inputs.confirm]);
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
  const verifyHandler = async (e) => {
    setLoad(true);
    e.preventDefault();
   
    try {
      const response = await axios.post(
        "https://connectify-app.onrender.com/api/v1/auth/reset-password",
        {
          email: email,
          newPassword: inputs.password,
        }
      );
      setLoad(false);

      if (response.data.success) {
        router.push("/login");
      }
    } catch (error) {
      setLoad(false);
     
      console.log(error);
    }
  };
  return (
    <form onSubmit={verifyHandler} className="w-[544px] flex flex-col absolute left-[145px] top-[26vh] lg:left-1/2 lg:transform lg:-translate-x-1/2 sm:w-[86.7vw] mob:top-[28.7vh]">
      <div className="tex text-white font-sans text-[40px] font-semibold mb-[3.8vh] mob:leading-[48px]">
        Reset <span className="mob:block">Password</span>
      </div>
      <div className="label relative w-[100%] h-[100px] pt-[34px] pb-[29px] mob:h-[8vh] mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[18px]">
        <input
          className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[18px]"
          required
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleInputChange}
          placeholder="New Password"
          maxLength={25}
        />
          {inputs.password?<div className="tex absolute top-[3px] text-[18px] font-[500] mob:text-[13px] text-[#FFF] ">Password</div>:null}
        <hr
          className="border-b-2 border-[#9A9DA1] "
          style={
            error.password
              ? { borderColor: "#F41F41" }
              : { borderColor: "#9A9DA1" }
          }
        ></hr>
        {error.password ? (
          <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide mob:text-[13px]">
            {error.password}
          </p>
        ) : null}
      </div>
      <div className="label relative w-[100%] h-[100px] pt-[34px] pb-[29px] mob:h-[8vh] mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[18px] mob:mt-[8px]">
        <input
          className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[18px]"
          required
          type="password"
          name="confirm"
          value={inputs.confirm}
          onChange={handleInputChange}
          placeholder="Confirm New Password"
          maxLength={25}
        />
        {inputs.confirm?<div className="tex absolute top-[3px] text-[18px] font-[500] mob:text-[13px] text-[#FFF] ">Confirm New Password</div>:null}
        <hr
          className="border-b-2 border-[#9A9DA1] "
          style={
            error.confirm
              ? { borderColor: "#F41F41" }
              : { borderColor: "#9A9DA1" }
          }
        ></hr>
        {error.confirm ? (
          <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide mob:text-[13px]">
            {error.confirm}
          </p>
        ) : null}
      </div>

      <div className=" w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center mt-[14vh] mob:mt-[23.8vh]">
        {!isLoad ? (
          <button type="submit" className="tex font-sans text-[24px] font-semibold">
          Back to login
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};

export default Page;
