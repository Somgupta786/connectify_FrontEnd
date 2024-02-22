"use client"
import React, { useEffect } from "react";
import SideBar from "@/components/Home/sideBar";
import Card from "@/components/Home/card";
import Popup from "@/components/Home/community/popup";
import { useState } from 'react';
import { UseSelector,useDispatch, useSelector } from "react-redux";

import { addToken } from "@/redux/slices/tokenSlice";
const page = () => {

 
  
  // const  dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(addToken("my name"))
  // },[])
 
  const[showPopup,setShowPopup]=useState(false)
  const openPopup = () => {
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className=" w-[100vw] flex bg-[#16202A] scroll-smooth ">
      <SideBar />
      <div className="w-[83.3%] relative  flex px-[24px] gap-[16px] bg-[#1F2F3E] rounded-tl-[16px] rounded-bl-[16px]">
        <div className="w-[49.5vw] h-[100vh] pt-[4.18vh] pr-[5.06vw] pb-0 pl-[5.06vw] flex flex-col gap-[3.1vh] items-start overflow-scroll">
          <div className=" text-[#F5FEF9] text-[1.5rem] leading-normal font-[600] not-italic bolder-0">
            Home
          </div>
          <div className=" flex gap-[15px] items-center justify-start">
            <img src="img.svg"></img>
            <div className=" relative w-[35.2vw] h-[6.02vh] pt-[7px] pr-[3.6vw] pb-[7px] pl-[1.11vw] rounded-[32px] border-[#F5FEF9] border border-solid">
              <input
                className="tex w-[100%] h-[100%] bg-transparent border-none focus:outline-none text-[#F5FEF9] text-[1rem]  font-medium leading-[140%] tracking-[0.64px] "
                placeholder="Start a post"
              />
              <img
                src="img2.svg"
                className="absolute right-[1.09vw] top-[7px]"
              ></img>
            </div>
          </div>
          <div className=" w-[100%] flex flex-col gap-[16px]">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="w-[29.3vw] h-[100vh] pr-[1.87vw] flex flex-col gap-[3.1vh]">
          <div className=" mt-[11.3vh] w-[100%] h-[44.7vh] rounded-[8px] bg-[#16202A] px-[1.38vw] pt-[1.57vh] pb-[3.14vh]"></div>
          <div></div>
          <div className=" mt-[6px]"></div>
        </div>
        <div className="new absolute w-[80vw] h-[10.4vh] rounded-[24px] bottom-[16px] bg-col bg-opacity-60 px-[12px] pt-[12px] flex gap-[12px] items-center">
          <div className="btn flex flex-col gap-[1vh] items-center">
            <div className=" w-[56px] h-[7.2vh] rounded-[12px] bg-[#1F2F3E] flex items-center justify-center">
              {" "}
              <img src="/Home 1.svg"></img>
            </div>
            <img src="Ellipse 38.svg" className=" w-[22px] h-[0.7vh] "></img>
          </div>
          <img src="sepration.svg"></img>
          <div className=" self-start w-[72vw] flex justify-between">
            <div className=" flex gap-[16px] self-start">
              <img
                src="sii.svg"
                className="btn rounded-[12px] w-[56px] h-[7.2vh] hover:translate-y-[-4px] ease-in-out duration-[0.3s]"
              />
              <img
                src="Frame.svg"
                className="btn  w-[56px] h-[7.2vh] hover:translate-y-[-4px] ease-in-out duration-[0.3s]"
              />
              <img
                src="frr.svg"
                className="btn  w-[56px] h-[7.2vh] ease-in-out hover:translate-y-[-4px] duration-[0.3s]"
              />
            </div>
            <div  className=" flex gap-[10px] self-start">
             <img src="side.svg" className=" btn w-[56px] h-[7.2vh] hover:scale-[1.2] duration-[0.2s]"/>
             <img src="side plus.svg" onClick={openPopup} className="w-[56px] h-[7.2vh] hover:scale-[1.2] duration-[0.2s]"/>
            </div>
          </div>
        </div>
        <div className=" max-w-[55.4vw] bg-[#16202A] rounded-[12px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
      </div>
      {<Popup onClose={closePopup} show={showPopup}/>}
    </div>
  );
};

export default page;
