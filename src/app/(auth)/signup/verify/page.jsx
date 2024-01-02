import React from "react";

const page = () => {
  return (
    <div>
      <div className=" text-white font-sans text-[24px] font-semibold mt-[48px] flex flex-col gap-[40px]">
        <div>
          Verify yourself
          <div
            className=" text-white font-sans text-[18px] font-medium line-height: 140%; /* 25.2px */
letter-spacing: 0.72px;"
          >
            Beep-boop! Code dispatched.
          </div>
        </div>
        <div className=" flex gap-[67px]">
          <input className="otpBox pt-[20px] pb-[20px] pl-[20px] "></input>
          <input className="otpBox pt-[20px] pb-[20px] pl-[20px] "></input>
          <input className="otpBox pt-[20px] pb-[20px] pl-[20px] "></input>
          <input className="otpBox pt-[20px] pb-[20px] pl-[20px] "></input>
        </div>
        <div className="text-[#35CCCD] font-sans text-base font-semibold leading-[145%] tracking-wider " >Resend OTP</div>
      </div>
      <div className=" w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center mt-[14vh]" >
          <button type="submit" className=" font-sans text-[24px] font-semibold "> NEXT</button>
        </div>
    </div>
  );
};

export default page;
