import React from "react";

const page = () => {
  return (
    <div className=" w-[37.7%] flex flex-col absolute left-[11.11vw] top-[18vh]">
      <div className=" text-[#fff] font-sans text-[2.5rem] font-semibold">Login</div>
      <div className=" mt-[34px]">
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
           className=" bg-transparent h-full w-full  font-sans text-2xl font-semibold border-none focus:outline-none "
            required
          
            type="email"
            name="email"
            placeholder="Email address"
          />
          <hr className="border-b-2 border-[#9A9DA1] mt-1 "></hr>
        </div>
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
          className=" bg-transparent  h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none"
           
            required
            type="password"
            name="password"
            placeholder="Password"
          />
          <hr className="border-b-2 border-[#9A9DA1] mt-1"></hr>
        </div>
      </div>
      <div className="text-[#35CCCD] font-sans text-base font-semibold leading-[145%] tracking-wider ml-auto  "> Forget Password</div>
      <div className=" mt-[53px] flex flex-col gap-[32px]">
        <div className=" w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center" >
          <button type="submit" className=" font-sans text-[24px] font-semibold"> LOGIN</button>
        </div>
        <div className=" w-full h-[6.9vh] bg-transparent rounded-xl border-[3px] border-solid border-[#F5FEF9] pl-[117px] pr-[117px] flex justify-center items-center">
          <button type="submit" className=" flex gap-[16px]">
         <img className=" self-center" src="/google.svg"/>
         <span className=" font-sans text-[24px] font-semibold text-[#FFF]"> Signin with google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
