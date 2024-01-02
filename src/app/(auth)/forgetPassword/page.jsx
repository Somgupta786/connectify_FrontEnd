import React from 'react'

const page = () => {
  return (
    <div className="w-[37.7%] flex flex-col absolute left-[145px] top-[26vh]">
         <div className="text-white font-sans text-[40px] font-semibold">Forgot Password?</div>
         <div className="text-white font-sans text-[24px] font-semibold ">Enter you registered email</div>
         <div className="label w-[100%] h-[100px] pt-[48px] pb-[29px] mt-[10px]">
          <input
            className="bg-transparent h-full w-full font-sans text-2xl font-semibold border-none focus:outline-none"
            required
            type="email"
            name="email"
            placeholder="Email address"
          />
          <hr className="border-b-2 border-[#9A9DA1] mt-1" />
        </div>
        <div className="w-full h-[6.9vh] bg-[#35CCCD] rounded-xl pl-[117px] pr-[117px] flex justify-center items-center mt-[9.4vh]">
          <button type="submit" className="font-sans text-[24px] font-semibold">
            NEXT
          </button>
        </div>
    </div>
  )
}

export default page
