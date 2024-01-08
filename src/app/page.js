"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigaton';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    
    router.push('/signup');
  }, []);
  

  return <div>Redirecting...</div>;
};

export default Home;
