"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Loader from "@/components/loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const formRef = useRef();
  const router = useRouter();
  const email =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("email"))
      : null;

  const [avatars, setAvatars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState("0");
  const [inputs, setInputs] = useState({
    username: "",
  });
  const [isLoad, setLoad] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  useLayoutEffect(() => {
    const isSigned =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("isSigned"))
        : null;
    if (!isSigned) {
      router.push("/signup");
    }
  }, []);

  useEffect(() => {
    const avatarHandler = async () => {
      try {
        const response = await axios.get(
          "https://connectify-app.onrender.com/api/v1/auth/getAvatars"
        );
        setAvatars(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    avatarHandler();
  }, []);

  const selectHandler = (avatar, index) => {
    setCurrentIndex(index);
    setSelectedAvatar(avatar);
  };
  const submitHandler = async (e) => {
    setLoad(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("userId", inputs.username);
    formData.append("file", selectedAvatar);

    try {
      const response = await axios.post(
        "https://connectify-app.onrender.com/api/v1/auth/selectAvatar",
        {
          email: email,
          userId: inputs.username,
          profileImageUrl: selectedAvatar,
        }
      );

      setLoad(false);

      if (response.data.success) {
        localStorage.setItem("isVerified", JSON.stringify(true));
        router.push("/signup/details/verify");
      } else {
        console.error(response.data);
      }
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const clickHandler = () => {
    formRef.current.click();
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-[6.6vh] mt-[6.19vh] mob:mt-[5vh]"
    >
      <div className=" flex flex-col gap-[5.11vh]">
        <div className="text-[#F5FEF9] font-sans text-2xl font-semibold">
          <div>Pick a Pic!</div>
          <div className="w-[46.4583vw] h-[138px] flex gap-[16px] items-center overflow-scroll mob:w-[100%] mob:mt-[16px] md:w-[100%] ">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                className="btn h-[64px] w-[64px] bg-transparent rounded-full 
"
                onClick={() => selectHandler(avatar, index)}
                style={
                  currentIndex == index
                    ? {
                        height: "109px",
                        width: "109px",
                        borderColor: "#35CCCD",
                        borderWidth: "4px",
                      }
                    : null
                }
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[#F5FEF9] font-sans text-2xl font-semibold">
            Pick a username
          </div>
          <div className="label relative w-[100%] h-[100px] pt-[34px] pb-[29px] text-[#F5FEF9] font-sans text-2xl font-semibold mob:h-[8vh] mob:pb-[2vh] mob:pt-[2.6vh] mob:text-[18px]">
            <input
              className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none mob:text-[18px]"
              required
              type="text"
              value={inputs.username}
              name="username"
              onChange={handleInputChange}
              placeholder="Username"
            />
            {inputs.username ? (
              <div className="tex absolute top-[0px] text-[18px] font-[500] mob:text-[13px] ">
                Username
              </div>
            ) : null}
            <hr className="border-b-2 border-[#9A9DA1] mt-1"></hr>
          </div>
        </div>
      </div>
      <div
        onClick={clickHandler}
        className="btn w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center"
      >
        {!isLoad ? (
          <button
            ref={formRef}
            type="submit"
            className="tex font-sans text-[24px] font-semibold"
          >
            Next
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};

export default Page;
