"use client";
import React, { useState, useEffect, useRef } from "react";
import Loader from "@/components/loader";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()
  const email = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('email')) : null;
  const [avatars, setAvatars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState("0");
  const [inputs, setInputs] = useState({
   username:""
  });
  const [isLoad, setLoad] = useState(false);
 const  [selectedAvatar,setSelectedAvatar]  = useState('')
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

  const selectHandler = (avatar,index) => {
    setCurrentIndex(index);
    setSelectedAvatar(avatar)
   
    
  };
  const submitHandler = async (e) => {
    setLoad(true)
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('userId', inputs.username);
    formData.append('file', selectedAvatar);
  
    try {
      const response = await axios.post('https://connectify-app.onrender.com/api/v1/auth/selectAvatar', {
        email:email,
        userId:inputs.username,
        profileImageUrl:selectedAvatar,
      });
  
      setLoad(false);
  
      if (response.data.success) {
        router.push("/login");
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
  

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-[12.3vh] mt-[52px]">
      <div className=" flex flex-col gap-[43px]">
        <div className="text-[#F5FEF9] font-sans text-2xl font-semibold">
          <div>Pick a Pic!</div>
          <div className="w-[46.4583vw] h-[138px] flex gap-[16px] items-center overflow-scroll ">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                className="h-[64px] w-[64px] bg-transparent rounded-full 
"
                onClick={() => selectHandler(avatar,index)}
              
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
          <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px] text-[#F5FEF9] font-sans text-2xl font-semibold">
            <input
              className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none"
              required
              type="text"
              value={inputs.username}
              name="username"
              onChange={handleInputChange}
              placeholder="Username"
            />
            <hr className="border-b-2 border-[#9A9DA1] mt-1"></hr>
          </div>
        </div>
      </div>
      <div className="w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center">
      {!isLoad?<button type="submit" className="font-sans text-[24px] font-semibold">
            NEXT
          </button>:<Loader/>}
      </div>
    </form>
  );
};

export default Page;
