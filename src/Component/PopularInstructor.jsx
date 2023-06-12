import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';

const PopularInstructor = () => {
    const { refetch, data: popularInstructor = [] } = useQuery({
        queryKey: ['popularInstructor'],
        queryFn: async () => {
            const res = await axios.get(`https://server-a12.vercel.app/getInstructors`)
            return res.data;
        },
    })
    return (
        popularInstructor && <div className='my-28'>
          <h1 className='mt-8 text-center text-4xl font-bold'>Popular Instructors</h1>
          <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">{
             popularInstructor.slice(0,6)?.map((item, index)=>(
            <div key={item._id} className="card mt-10 md:mt-16 bg-base-10 ">
                <figure><img title={item.name.toUpperCase()} className='w-full md:h-[260px]' src={item.photo} alt={item.name} /></figure>
            </div>
           ))
         }
         </div>
       </div>
     )
}

export default PopularInstructor