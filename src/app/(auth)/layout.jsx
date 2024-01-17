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
    <div className="loginMain bg-[#16202A] h-[100vh] bg-contain md:bg-cover bg-no-repeat relative" style={pathname=="/signup/verify/details"?{height:"105vh"}:null}>
      <div className="navBar relative ">
        <Logo />
        {pathname === "/login" ? (
  <div className="account absolute top-[6.3vh] right-[11.11vw] sm:right-[24px] mob:top-[90vh] mob:w-[100vw]  mob:flex mob:justify-center mob:right-0">
    Need an account? <span className="btn text-[#35CCCD]" onClick={() => router.push("/signup")}> Sign up</span>
  </div>
) : pathname === "/signup" ? (
  <div className="account whitespace-nowrap absolute top-[6.3vh] right-[11.11vw] sm:right-[24px] mob:top-[90vh] mob:w-[100vw] mob:flex mob:justify-center mob:right-0">
    Already have an account? <span className="btn text-[#35CCCD]" onClick={() => router.push("/login")}>Sign in</span>
  </div>
) : null}
      </div>
      {children}
      <div className="rightImg w-[584px] lg:hidden xl:w-[475px] "></div>
    </div>
  );
}
