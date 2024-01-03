import React from 'react'

const Loader = () => {
  return (
    <div className=' flex z-10 gap-[13px] '>
      <div className='loader h-[30px] w-[30px] rounded-[50%] bg-[#EA63B9] z-10' ></div>
      <div className='loaderr h-[30px] w-[30px] rounded-[50%] bg-[#F0584F] z-10' ></div>
    </div>
  )
}

export default Loader
