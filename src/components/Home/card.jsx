import React from "react";

const Card = () => {
  return (
    <div className=" flex flex-col gap-[12px] w-[100%] bg-[#16202A] rounded-[8px] pr-[18px] pt-[18px] pb-[18px] pl-[18px]">
      <div className="tex flex gap-[10px] items-center">
        <img src="img3.svg" className="h-[27.2px] w-[27.2px] " />
        <div className=" flex gap-[6px] text-[#F5FEF9] text-[1.15rem] font-[500] leading-[140%] tracking-[0.72px] not-italic items-center ">
          <div> Software Incubator</div>
          <img src="cir.svg"/>
          <div className=" items-center text-[0.88rem] font-[400] leading-normal tracking-tighter text-[#F5FEF9] font-sans">
            Posted by Lakshya Goel
          </div>
        </div>
      </div>
      <div className=" flex gap-[18px]">
        <div className=" w-[31.6vw] h-[31.4vh] rounded-[16px] border-[0.35px] border-solid border-[#F5FEF9] bg-[#263238]" ></div>
        <div className=" "></div>
      </div>
      <div className="tex w-[31.6vw] mt-[4px] text-[#F5FEF9] text-[1.15rem] font-[500] leading-[140%] tracking-[0.72px] not-italic">We're thrilled to announce the launch of our new Flutter Community on Connectify!...  Read More</div>
    </div>
  );
};

export default Card;
