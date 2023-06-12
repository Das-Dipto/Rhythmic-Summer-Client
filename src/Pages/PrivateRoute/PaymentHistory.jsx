import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../ContextProvider/AuthProvider';
import useTitle from '../../Hooks/useTitle';

const PaymentHistory = () => {

    useTitle('Payment History');

    const {user} = useContext(AuthContext);
    const { refetch, data: enrolledClasses = [] } = useQuery({
      queryKey: ['enrolledClasses'],
      queryFn: async () => {
          const res = await axios.get(` https://server-a12.vercel.app/enrolledClasses?studentEmail=${user?.email}`)
          return res.data;
      },
   })
  return (
        enrolledClasses && 
        <div>
        <h1 className='text-3xl font-semibold text-center my-5'>Student Dashboard-  Payment History</h1>
          <div className="overflow-x-auto ms-4 mt-8">
                <table className="table table-xs">
                  <thead className='table-head'>
                    <tr >
                      <th></th>
                      <th>Transaction ID</th> 
                      <th>Class</th> 
                      <th>Price</th> 
                      <th>Payment Date</th> 
                    </tr>
                  </thead> 
                  <tbody>
                    {
                    enrolledClasses?.map((item, index)=>(
                        <tr className='hover' key={item._id}>
                          <th>{index + 1}</th>
                          <td>{item.transactionId}</td>
                          <td>{item.class}</td>
                          <td>$ {item.price}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))
                    }
                  </tbody> 
                </table>
                <Link to='../enrolled'>
                    <button className='btn btn-sm btn-outline btn-neutral ms-16 mt-5'>Back</button>
                </Link>
          </div>
        </div>
  )
}

export default PaymentHistory