import React from 'react';

const Page = () => {
  return (
    <>
      <div className="mt-[34px]">
        <div className="label w-[100%] h-[100px] pt-[48px] pb-[29px]">
          <input
            className="bg-transparent h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="text"
            name="name"
            placeholder="Full Name"
          />
          <hr className="border-b-2 border-[#9A9DA1] mt-1" />
        </div>
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
            className="bg-transparent h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="email"
            name="email"
            placeholder="Email"
          />
          <hr className="border-b-2 border-[#9A9DA1] mt-1" />
        </div>
        <div className="label w-[100%] h-[100px] pt-[34px] pb-[29px]">
          <input
            className="bg-transparent h-full w-full text-[#F5FEF9] font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="password"
            name="password"
            placeholder="Password"
          />
          <hr className="border-b-2 border-[#9A9DA1] mt-1"></hr>
        </div>
      </div>
      <div className="mt-[53px] flex flex-col gap-[32px]">
        <div className="w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center">
          <button type="submit" className="font-sans text-[24px] font-semibold">
            NEXT
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
