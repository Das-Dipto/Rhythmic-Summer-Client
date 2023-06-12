import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2'

const ManageUser = () => {

  const {user} = useContext(AuthContext)
  const { refetch, data: allUsers = [] } = useQuery({
    queryKey: ['updateUsers'],
    queryFn: async () => {
        const res = await axios.get(` https://server-a12.vercel.app/getAllUsers`)
        return res.data;
    },
})
// console.log(allUsers);
const makeAdmin = (userID, buttonId) =>{
  // console.log(`${user.role} is now admin`)
  // console.log(`${buttonId} is now disabled`)
  callSwal(userID, 'admin')
 
}

const makeInstructor = (userID, buttonId) =>{
  // console.log(`${user} is now instructor`)
  // console.log(`${buttonId} is now disabled`)

  callSwal(userID, 'instructor')
}


const callSwal = (userID, userRole) => {
  const updatedRole = { role : userRole}
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      fetch(` https://server-a12.vercel.app/updateUserRole/${userID}`,{
        method:'PUT',
        headers:{
          'content-type' : 'application/json'
        },
        body: JSON.stringify(updatedRole)
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
    allUsers && <div className="overflow-x-auto ms-4 mt-8">
        <table className="table table-xs">
          <thead className='table-head'>
            <tr >
              <th></th> 
              <th>Photo</th> 
              <th>Name</th> 
              <th>Email</th> 
              <th>Role</th> 
              <th>Admin Button</th> 
              <th>Instructor Button</th>
            </tr>
          </thead> 
          <tbody>
            {
              allUsers?.map((item, index)=>(
                <tr key={item._id} >
                   <th>{index + 1}</th>
                   <td > <img className='user-img' src={item.photo} alt={item.name} /> </td>
                   <td>{item.name.toUpperCase()}</td>
                   <td>{item.email}</td>
                   <td>{item.role}</td>
                   <td>
                     <button
                     disabled = {
                      (item.role == 'admin' ) ? true : false
                     }
                     className="btn btn-outline btn-primary" onClick={()=>makeAdmin(item._id)}>Make Admin</button>
                   </td>
                   <td>
                     <button
                     disabled = {
                       (item.role == 'instructor' ) ? true : false
                      }
                     className="btn btn-outline btn-secondary" onClick={()=>makeInstructor(item._id)}>Make Instructor</button>
                   </td>
                </tr>
              ))
            }
         
          </tbody> 
          
        </table>
    </div>
  )
}

export default ManageUser