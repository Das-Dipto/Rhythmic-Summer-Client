import React from 'react'
import {AiFillPlusSquare} from 'react-icons/ai'
import {FaChalkboardTeacher} from 'react-icons/fa'
import { Outlet, NavLink } from 'react-router-dom'

const InstructorDash = () => {
  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
                    <Outlet></Outlet>
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side ">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li className='font-semibold'><NavLink to="/InstructorDash/addClass"><AiFillPlusSquare fontSize={24} color='orange' /> Add a Class</NavLink></li>
            <li className='font-semibold'><NavLink to="/InstructorDash/myClass"><FaChalkboardTeacher  fontSize={24} color='orange'/> My Classes</NavLink></li>
            </ul>
        
        </div>
   </div>
  )
}

export default InstructorDash