import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../ContextProvider/AuthProvider';


const EnrolledClass = () => {
  const {user} = useContext(AuthContext);
  const { refetch, data: enrolledClasses = [] } = useQuery({
    queryKey: ['enrolledClasses'],
    queryFn: async () => {
        const res = await axios.get(` https://server-a12.vercel.app/enrolledClasses?studentEmail=${user?.email}`)
        return res.data;
    },
 })


  return (
    
        enrolledClasses && <div className="overflow-x-auto ms-4 mt-8">
              <table className="table table-xs">
                <thead className='table-head'>
                  <tr >
                    <th></th> 
                    <th>Payee</th> 
                    <th>Email</th> 
                    <th>Class</th> 
                    <th>Price</th> 
                    <th>Status</th>       
                  </tr>
                </thead> 
                <tbody>
                  {
                  enrolledClasses?.map((item, index)=>(
                      <tr className='hover' key={item._id}>
                        <th>{index + 1}</th>
                        <td>{item.payee.toUpperCase()}</td>
                        <td>{item.email}</td>
                        <td>{item.class}</td>
                        <td>$ {item.price}</td>
                        <td className='text-success font-bold'>Enrolled</td>  
                      </tr>
                    ))
                  }
                </tbody> 
              </table>
              <Link to='../paymentHistory'>
                  <button className='btn btn-sm btn-outline btn-neutral ms-10 mt-5'>Payment History</button>
              </Link>
        </div>
  )
}

export default EnrolledClass