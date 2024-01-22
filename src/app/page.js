"use client"
import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Redirect } from 'react-router-dom';


const Home = () => {
  const router = useRouter();
  
  useLayoutEffect(() => {
    
    router.push('/signup');
  }, []);
  

  return <div>Redirecting...</div>;
};

export default Home;
