"use client";
import React from "react";
import { Modal } from "@mui/base/Modal";
import { useState } from "react";
import { useRef } from "react";
import Loader from "@/components/loader"; 
import axios from "axios";

import { UseSelector, useDispatch, useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};
const Popup = ({ onClose, show }) => {
  const accessToken = useSelector((state) => state.accessToken);

  
  console.log(accessToken);
  const imageRef = useRef();
  const [communityLogo, setCommunityLogo] = useState(null);
  const [communityData, setCommunityData] = useState({
    name: "",
    description: "",
  });
  const [process, setProcess] = useState(false);

  const changeLogo = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Convert file data to desired format, e.g., base64
      const base64Data = reader.result;
      setCommunityLogo(base64Data);
      console.log(base64Data);
    };

    if (file) {
      reader.readAsDataURL(file); // Read file as data URL
    }
   
  };
  const createCommunity = async (e) => {
    e.preventDefault();
    setProcess(true);
    try{
        const formData = new FormData();
        formData.append('name', communityData.name);
        formData.append('description', communityData.description);
        formData.append('file',communityLogo);
        const response = await axios.post(
            "https://connectify-app.onrender.com/api/v1/communities/create", formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
              
            }
          );
          if(response){
            console.log(response)
            setProcess(false);
          }
    }
    catch(error){
        setProcess(false);
    }
    
   
  };
  return (
    <Modal open={show} onClose={onClose}>
      <div
        style={style}
        className="relative z-[100] rounded-[12px] flex flex-col gap-[42px] w-[796.8px] font-FontPro  bg-[#16202A] text-[#FFF] font-[500] px-[24px] py-[16px] lg:w-[55.47vw]"
      >
        <div className=" flex justify-between items-start">
          <div>
            {" "}
            <div className=" text-[24px] leading-[28.8px] tracking-[4%]">
              Create Your Community
            </div>
            <div className=" font-FontPro  text-[14px] leading-[16.71px] text-[#9A9DA1]">
              Your community is the place where you and other people with common
              mindset can connect together.
            </div>
          </div>
          <div>
            <img src="close.svg" onClick={() => onClose()} className="btn" />
          </div>
        </div>
        <form onSubmit={createCommunity}>
          <div className="flex w-[312px] flex-col">
            <div className=" flex flex-shrink-[1] gap-[20px] items-center">
              <div className=" w-[85px] h-[85px] rounded-[50%]">
                <img
                  onClick={() => {
                    imageRef.current.click();
                  }}
                  src={!communityLogo ? "camera.svg" : communityLogo}
                  className="btn h-[100%] w-[100%] rounded-[50%]"
                />
                <input
                  type="file"
                  ref={imageRef}
                  onChange={changeLogo}
                  className=" hidden"
                />
              </div>
              <div className=" font-[600] text-[16px] leading-[23.2px] tracking-[4%]">
                {!communityLogo ? (
                  "Add Community icon"
                ) : (
                  <div className="btn flex flex-col gap-[20.5px]">
                    <div
                      className=" text-[#35CCCD] "
                      onClick={() => {
                        imageRef.current.click();
                      }}
                    >
                      <img
                        className=" inline text-[#35CCCD] "
                        src="Image.svg"
                      />
                      &nbsp;&nbsp;&nbsp;Choose another
                    </div>
                    <div
                      className=" text-[#F41F41] "
                      onClick={() => setCommunityLogo(null)}
                    >
                      <img
                        className=" inline text-[#F41F41]"
                        src="delete.svg"
                      />
                      &nbsp;&nbsp;&nbsp; Remove{" "}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-shrink-[1] ">
              <div className="w-[100%]  h-[64px] py-[20px] px-1">
                <input
                  placeholder="Community Name "
                  className="w-[100%] px-1 bg-transparent focus:outline-none"
                  value={communityData.name}
                  onChange={(e) =>
                    setCommunityData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  maxLength={30}
                />
                <hr className="border-b-2 mt-[4px] border-[#9A9DA1] " />
              </div>
              <div className=" w-[100%] py-[20px] px-1  ">
                <input
                  placeholder="Description"
                  value={communityData.description}
                  onChange={(e) =>
                    setCommunityData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  style={{ overflowWrap: "break-word" }}
                  type=""
                  className="w-[100%]  px-1 bg-transparent focus:outline-none overflow-y-auto "
                />

                <hr className="border-b-2 mt-[4px] border-[#9A9DA1] " />
              </div>
            </div>
            <div className="btn w-[100%] rounded-[8px] mt-[48px] mb-[30px] h-[47px] bg-[#35CCCD] text-[#16202A] text-[16px] flex items-center justify-center">
              {!process ? <button type="submit">Create</button> : <Loader />}
            </div>
          </div>
        </form>
        <div className=" absolute right-0 bottom-0">
          <img src="connect.svg" />
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
