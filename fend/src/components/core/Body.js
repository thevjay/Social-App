import React from 'react'
import NavBar from '../common/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../common/Footer';

const Body = () => {
  return (
    <div className='flex flex-col justify-between'>
      <NavBar />
      <Outlet />
      <Footer />
      {/* <h1 className='text-3xl font-bold'>Body</h1> */}
    </div>
  )
}

export default Body;
