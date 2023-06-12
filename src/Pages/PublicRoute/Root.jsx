import React from 'react'
import Navber from '../../Component/Navber'
import { Outlet } from 'react-router-dom'
import Footer from '../../Component/Footer'

const Root = () => {
  return (
    <>
    <Navber></Navber>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default Root