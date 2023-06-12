import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2'
import {GrUpdate} from 'react-icons/gr'
import { Link } from 'react-router-dom';

const MyClass = () => {
  const {user} = useContext(AuthContext)
  const { refetch, data: allClasses = [] } = useQuery({
    queryKey: ['allClasses'],
    queryFn: async () => {
        const res = await axios.get(` https://server-a12.vercel.app/getAllClasses?instructorEmail=${user?.email}`)
        return res.data;
    },
})


  return (
    allClasses && 
    <div>
      <h1 className='text-3xl font-semibold text-center my-5'>Instructor Dashboard-  My Added Class</h1>
      <div className="overflow-x-auto ms-4 mt-8">
        <table className="table table-xs">
          <thead className='table-head'>
            <tr >
              <th></th> 
              <th>Class</th> 
              <th>Price</th> 
              <th>Seats</th> 
              <th>Enrollment</th> 
              <th>Status</th> 
              <th>Feedback</th>
              <th>Update</th>
            </tr>
          </thead> 
          <tbody>
            {
              allClasses?.map((item, index)=>(
                <tr key={item._id} >
                   <th>{index + 1}</th>
                   <td>{item.className.toUpperCase()}</td>
                   <td>{item.price}</td>
                   <td>{item.seats}</td>
                   <td>{item.enrollment}</td>
                   <td>{item.status}</td>
                   <td>{(item.feedback) ? item.feedback : ''}</td>
                   <td>
                   <Link to={`../updateClassInfo/${item._id}`}>
                      <button className="btn btn-error">
                          <GrUpdate fontSize={20}/>
                      </button>
                   </Link>
                   </td>
                </tr>
              ))
            }
         
          </tbody> 
          
        </table>
      </div>
    </div>
  )
}

export default MyClass