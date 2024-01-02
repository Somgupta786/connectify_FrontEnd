import React from "react";
import "./styles.css";
import Logo from "@/components/logo";
export default function Layout({ children }) {
  return (
    <div className="loginMain bg-[#16202A] h-screen bg-contain bg-no-repeat relative">
      <div className="navBar relative">
        <Logo />
        <div className="account absolute top-[6.3vh] right-[11.11vw]">
          Need an account? <span className=" text-[#35CCCD]"> Sign up</span>
        </div>
      </div>
      {children}
      <div className="rightImg "></div>
    </div>
  );
}
