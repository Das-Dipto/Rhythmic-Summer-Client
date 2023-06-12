import React from 'react'
import Navber from '../../Component/Navber'
import { Outlet } from 'react-router-dom'
import Footer from '../../Component/Footer'
import { useState } from 'react'

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  return (
  <div className={`bg-${darkMode ? 'gray-900' : 'white'} text-${darkMode ? 'white' : 'black'}`}>
    <Navber toggle={toggleDarkMode}></Navber>
    <Outlet></Outlet>
    <Footer></Footer>
  </div>
  )
}

export default Root