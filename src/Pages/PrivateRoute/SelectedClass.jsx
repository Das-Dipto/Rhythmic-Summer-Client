import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios';
import {AiOutlineDollarCircle} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'

const SelectedClass = () => {
  const {user} = useContext(AuthContext)
  const { refetch, data: selectClasses = [] } = useQuery({
    queryKey: ['selectClasses'],
    queryFn: async () => {
        const res = await axios.get(` https://server-a12.vercel.app/selectClasses?studentEmail=${user?.email}`)
        return res.data;
    },
})

const deleteHandle =(id) =>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(` https://server-a12.vercel.app/deleteClass/${id}`,{
        method:'DELETE'
      })
      .then((res)=>res.json())
      .then((data)=>{
        if(data.deletedCount > 0){
          Swal.fire(
            'Deleted!',
            'Class has been removed.',
            'success'
          )
          refetch()
        }
      })
      .catch((err)=>console.log(err.message))
    }
  })
}
  return (
      selectClasses && <div className="overflow-x-auto ms-4 mt-8">
              <table className="table table-xs">
                <thead className='table-head'>
                  <tr >
                    <th></th> 
                    <th>Picture</th> 
                    <th>Class Name</th> 
                    <th>Instructor Name</th> 
                    <th>Instructor Email</th> 
                    <th>Price</th> 
                    <th>Buttons</th> 
                  </tr>
                </thead> 
                <tbody>
                  {
                   selectClasses?.map((item, index)=>(
                      <tr className='hover' key={item._id}>
                        <th>{index + 1}</th>
                        <td><img className='w-[70px]' src={item.picture} alt={item.className} /></td>
                        <td>{item.className}</td>
                        <td>{item.instructorName.toUpperCase()}</td>
                        <td>{item.instructorEmail}</td>
                        <td>$ {item.price}</td>
                        <td>
                        <button onClick={()=>deleteHandle(item._id)} className="btn btn-outline btn-primary me-5">
                           <RiDeleteBin6Line fontSize={20}/>
                        </button>
                        <Link to={`../payment/${item._id}`}>
                            <button className="btn btn-outline btn-info">
                                <AiOutlineDollarCircle fontSize={20}/>
                            </button>
                        </Link>
                        </td>
                      </tr>
                    ))
                  }
              
                </tbody> 
                
              </table>
      </div>
    
  )
}

export default SelectedClass