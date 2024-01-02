import React from "react";

const page = () => {
  return (
    <div className=" flex flex-col gap-[14.3vh]">
      <div className="">
        <div>Pick a pic!</div>
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <hr className="border-b-2 border-[#9A9DA1] mt-1 "></hr>
        </div>
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
            className=" bg-transparent  h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none "
            required
            type="text"
            name="password"
            placeholder="Username"
          />
          <hr className="border-b-2 border-[#9A9DA1] mt-1"></hr>
        </div>
      </div>
      <div className=" w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center">
        <button type="submit" className=" font-sans text-[24px] font-semibold">
          {" "}
          FINISH
        </button>
      </div>
    </div>
  );
};

export default page;
