import React from 'react'
import "./styles.css"
import Logo from '@/components/logo'
export default function Layout({ children }) {
    return (
    <div className='loginMain bg-[#16202A] h-screen bg-contain bg-no-repeat'>
    <div className='navBar'>
        <Logo/>
    </div>
         {children}
         <div className='rightImg '>
       
         </div>
    </div>
    )
  }
