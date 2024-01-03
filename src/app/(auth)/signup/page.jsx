"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";


const Page = () => {
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
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateInput = (name, value) => {
    switch (name) {
      case "fullname":
        return value.trim() ? "" : "Full Name is required";
      case "email":
        return value.trim()
          ? emailRegex.test(value)
            ? ""
            : "Invalid email address"
          : "";
      case "password":
        if (!value.trim()) {
          return "";
        }

        const hasLowerCase = /[a-z]/.test(value);
        const hasUpperCase = /[A-Z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&]/.test(value);

        const requirements = [
          hasLowerCase && "at least one lowercase letter",
          hasUpperCase && "at least one uppercase letter",
          hasDigit && "at least one digit",
          hasSpecialChar && "at least one special character",
        ].filter(Boolean);

        if (requirements.length < 4) {
          return `Password must contain ${requirements.join(
            ", "
          )}, and be at least 8 characters long`;
        }

        return "";

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
    setLoad(true);
    e.preventDefault();
    console.log("g");

   
    const errors = {};
    Object.keys(inputs).forEach((name) => {
      const errorMessage = validateInput(name, inputs[name]);
      if (errorMessage) {
        errors[name] = errorMessage;
      }
    });

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "https://connectify-app.onrender.com/api/v1/auth/register",
          {
            fullname: inputs.fullname,
            email: inputs.email,
            password: inputs.password,
          }
        );

        setError(response.data);
        setLoad(false);
        console.log(response.data.success)
        if (response.data.success) {
          localStorage.setItem('email',JSON.stringify(inputs.email))
          router.push( '/signup/verify');
        } else {
          setLoad(false);
        }
      } catch (error) {
        
        console.log(error);
        setLoad(false);
      }
    } else {
      setError(errors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-[34px]">
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
            className="bg-transparent  h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="text"
            name="fullname"
            value={inputs.fullname}
            onChange={handleInputChange}
            placeholder="Full Name"
            maxLength={25}
          />
          <hr className="border-b-2 border-[#9A9DA1] " />
        </div>
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
            className="bg-transparent h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="Email"
            maxLength={40}
          />
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
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
            className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            placeholder="Password"
            maxLength={25}
          />
          <hr
            className="border-b-2 border-[#9A9DA1] "
            style={
              error.password
                ? { borderColor: "#F41F41" }
                : { borderColor: "#9A9DA1" }
            }
          ></hr>
          {error.password ? (
            <p className=" text-[#F41F41] font-sans text-[18px] font-medium leading-relaxed tracking-wide">
              {error.password}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-[53px] flex flex-col gap-[32px]">
        <div className="w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center">
          <button type="submit" className="font-sans text-[24px] font-semibold">
            NEXT
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
