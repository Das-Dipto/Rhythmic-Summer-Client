import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const Instructors = () => {
    const { refetch, data: instructors = [] } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
        const res = await axios.get(` https://server-a12.vercel.app/getInstructors`)
        return res.data;
    },
  })

  return (
    instructors && <div className='my-20'>
    <h1 className='mt-8 text-center text-4xl font-bold'>All Registered Instructors</h1>
    <div className="w-[90%]  mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 ">{
    instructors?.map((item, index)=>(
       <div key={item._id} className="card mt-10 md:mt-16 bg-base-100 shadow-xl">
       <figure><img className='w-full md:h-[260px]' src={item.photo} alt={item.name} /></figure>
       <div className="card-body">
         <h1 className="card-title">Name: {item.name.toUpperCase()}</h1>
         <h2>Email: {item.email}</h2>
       </div>
     </div>
     ))
   }
   </div>
 </div>
  )
}

export default Instructors