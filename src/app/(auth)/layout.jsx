'use client'
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import "./styles.css";
import Logo from "@/components/logo";
export default function Layout({ children }) {
  const router =  useRouter()
  const pathname = usePathname()
  return (
    <div className="loginMain bg-[#16202A] h-screen bg-contain bg-no-repeat relative">
      <div className="navBar relative">
        <Logo />
        {!pathname.startsWith("/signup") ?
        <div className="account absolute top-[6.3vh] right-[11.11vw]">
        
          Need an account? <span className="btn text-[#35CCCD]" onClick={()=>router.push("/signup")}> Sign up</span>
        </div>:<div className="account absolute top-[6.3vh] right-[11.11vw]">
        
        Already have an account? <span className="btn text-[#35CCCD]" onClick={()=>router.push("/login")}>Signin</span>
      </div>}
      </div>
      {children}
      <div className="rightImg "></div>
    </div>
  );
}
