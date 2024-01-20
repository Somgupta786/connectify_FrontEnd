import React from "react";

const SideBar = () => {
  return (
    <div  className="btn relative flex flex-col gap-[9.5vh] px-[14px] py-[4.4vh] w-[16.66%] h-[100vh] bg-[#16202A] rounded-tr-[12px] text-[1.12rem] font-[500] not-italic leading-[25.2px] tracking-[0.72px] font-FontPro text-[#F5FEF9] ">
      <img src="/fullLogo.svg" className=" w-[155px] h-[29px] ml-[-14px]" />
      <div className="btn flex flex-col gap-[12px]">
        <div className=" flex gap-[32px] w-[100%] h-[5.7vh] items-center ">
          <img src="/Website.svg" />
          <div className=" text-[#35CCCD]"> Communities</div>
        </div>
        <div className=" flex gap-[32px] w-[100%] h-[5.7vh] items-center">
          <img src="/Group 3.svg" />
          <div>Groups</div>
        </div>
        <div className=" flex gap-[32px] w-[100%] h-[5.7vh] items-center">
          <img src="/Message 28.svg" />
          <div>Messages</div>
        </div>
      </div>
      <div className="btn absolute bottom-[4.4vh] flex gap-[32px]">
      <img src="/demo.svg" />
          <div>Profile</div>
      </div>
    </div>
  );
};

export default SideBar;
