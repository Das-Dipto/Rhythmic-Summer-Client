import React, { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { AuthContext } from '../../ContextProvider/AuthProvider'

const Classes = () => {
  const {user} = useContext(AuthContext)
  const { refetch, data: approvedClasses = [] } = useQuery({
    queryKey: ['approvedClasses'],
    queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/getApprovedClass`)
        return res.data;
    },
})
  return (
   
      approvedClasses && <div>
       <h1 className='mt-8 text-center text-4xl font-semibold'>All Approved Classes</h1>
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">{
        approvedClasses?.map((item, index)=>(
          <div key={item._id} className="card mt-10 md:mt-16 bg-base-100 shadow-xl">
          <figure><img className='w-full' src={item.picture} alt={item.instructorName} /></figure>
          <div className="card-body">
            <h1 className="card-title">Class name: {item.className}</h1>
            <h2>Instructor Name: {item.instructorName}</h2>
            <h4>Available Seats: {item.seats}</h4>
            <h4>Price: {item.price}</h4>
            <div className="card-actions justify-start">
              <button className="btn btn-primary">Select</button>
            </div>
          </div>
        </div>
        ))
      }
      </div>
    </div>
  )
}

export default Classes