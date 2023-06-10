import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2'

const ManageClass = () => {
  const {user} = useContext(AuthContext);
  const { refetch, data: allClass = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/allClasses`)
        return res.data;
    },
})

console.log(allClass);
const updateStatus = (itemID, status) =>{
  const updatedItem = { status : status}
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/updateClassStatus/${itemID}`,{
        method:'PUT',
        headers:{
          'content-type' : 'application/json'
        },
        body: JSON.stringify(updatedItem)
      })
      .then((res)=>res.json())
      .then(data =>{
         if(data.modifiedCount > 0) {
          Swal.fire('Information updated successfully!')
          refetch()
         }
        //  console.log(data);
      })
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

}

  return (
    
       allClass && <div className="overflow-x-auto ms-4 mt-8">
        <table className="table table-xs">
          <thead className='table-head'>
            <tr >
              <th></th> 
              <th>Picture</th> 
              <th>Class Info</th> 
              <th>Seats</th> 
              <th>Price</th> 
              <th>Status</th> 
              <th>Update Status</th> 
            </tr>
          </thead> 
          <tbody>
            {
              allClass?.map((item, index)=>(
                <tr key={item._id} >
                   <th>{index + 1}</th>
                   <td > <img className='user-img' src={item.picture} alt={item.name} /> </td>
                   <td>
                      <p>Class name: {item.className.toUpperCase()} </p>
                      <p>Instructor name:  {item.instructorName.toUpperCase()} </p>
                      <p>Instructor email: {item.instructorEmail} </p>
                   </td>
                   <td>{item.seats}</td>
                   <td>{item.price}</td>
                   <td>{item.status}</td>
                   <td>
                     <button
                     className="btn btn-outline btn-primary me-4" onClick={()=> updateStatus(item._id, `Approved`)}>Approve</button>
                     <button
                     className="btn btn-outline btn-error me-4"   onClick={()=> updateStatus(item._id, `Deny`)}>Deny</button>
                     <button
                     className="btn btn-outline btn-info"    onClick={()=> updateStatus(item._id, `Feedback`)}>Feedback</button>
                   </td>
                </tr>
              ))
            }
          </tbody> 
        </table>
    </div>
    
  )
}

export default ManageClass