import React from 'react'
import Navber from '../../Component/Navber'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
    <Navber></Navber>
    <Outlet></Outlet>
    </>
  )
}

export default Root