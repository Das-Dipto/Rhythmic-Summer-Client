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
        const res = await axios.get(`http://localhost:5000/selectClasses?studentEmail=${user?.email}`)
        return res.data;
    },
})
  return (
      selectClasses && <div className="overflow-x-auto ms-4 mt-8">
              <table className="table table-xs">
                <thead className='table-head'>
                  <tr >
                    <th></th> 
                    <th>Picture</th> 
                    <th>Class Name</th> 
                    <th>Instructor Name</th> 
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
                        <td>{item.price}</td>
                        <td>
                        <button className="btn btn-outline btn-primary me-5">
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