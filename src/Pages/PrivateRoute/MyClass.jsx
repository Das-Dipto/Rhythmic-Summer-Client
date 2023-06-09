import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2'

const MyClass = () => {
  const {user} = useContext(AuthContext)
  const { refetch, data: allClasses = [] } = useQuery({
    queryKey: ['allClasses'],
    queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/getAllClasses`)
        return res.data;
    },
})


  return (
    // allClasses && <div className="overflow-x-auto ms-4 mt-8">
    //     <table className="table table-xs">
    //       <thead className='table-head'>
    //         <tr >
    //           <th></th> 
    //           <th>Class</th> 
    //           <th>Price</th> 
    //           <th>Seats</th> 
    //           <th>Enrollment</th> 
    //           <th>Status</th> 
    //           <th>Feedback</th>
    //         </tr>
    //       </thead> 
    //       <tbody>
    //         {
    //           allClasses?.map((item, index)=>(
    //             <tr key={item._id} >
    //                <th>{index + 1}</th>
    //                <td>{item.className.toUpperCase()}</td>
    //                <td>{item.price}</td>
    //                <td>{item.seats}</td>
    //                <td>0</td>
    //                <td>{item.status}</td>
    //                <td></td>
    //             </tr>
    //           ))
    //         }
         
    //       </tbody> 
          
    //     </table>
    // </div>
    <></>
  )
}

export default MyClass