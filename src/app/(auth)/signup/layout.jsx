'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react';

export default function Layout({ children }) {
  const router = usePathname();
  console.log(router)
  useEffect(() => {
    console.log("k")
  
    if (typeof window !== 'undefined') {
  
      console.log('Current Path:', router.pathname);
    }
  }, [router.pathname]);

  return (
    <div className="w-[544px] flex flex-col absolute left-[145px] top-[18vh] lg:left-1/2 lg:transform lg:-translate-x-1/2 sm:w-[86.7vw] mob:top-[19.3vh] ">
      <div className="tex text-white   text-[40px] font-semibold not-italic">Sign up</div>
      <div className="progress-bar mt-[26px]">
        <div className="progress-step start"></div>
        <div className="progress-step middle" style={
            router !== '/signup'
              ? { backgroundColor:"#75FBB9" }
              : {}
          }></div>
        <div className="progress-step end" style={
            router === '/signup/verify'
              ? { backgroundColor:"#75FBB9" }
              : {}
          }></div>
        <div
          className="progress-bar-inner"
          style={
            router === '/signup'
              ? { width: '0%' }
              : router === '/signup/verify'
              ? { transition: 'width 3s ease-in-out',width: '100%', }: router === '/signup/verify/details'
              ? { transition: 'width 3s ease-in-out',width: '50%', }
              : {}
          }
        ></div>
      </div>

      {children}
    </div>
  );
}
