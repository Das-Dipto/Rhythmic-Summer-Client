import React from 'react'
import {BiSelectMultiple} from 'react-icons/bi'
import {SiGoogleclassroom} from 'react-icons/si'
import { Outlet, NavLink } from 'react-router-dom'

const StudentDash = () => {
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
                <li className='font-semibold'><NavLink to="/StudentDash/selected"><BiSelectMultiple fontSize={24} color='orange'/> Selected Classes</NavLink></li>
                <li className='font-semibold'><NavLink to="/StudentDash/enrolled"><SiGoogleclassroom fontSize={24} color='orange'/> Enrolled Classes</NavLink></li>
                </ul>
            
            </div>
       </div>
    );
}

export default StudentDash