import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';
import { motion } from 'framer-motion';

const PopularClass = () => {
    const { refetch, data: popularClass = [] } = useQuery({
        queryKey: ['popularClass'],
        queryFn: async () => {
            const res = await axios.get(` https://server-a12.vercel.app/getPopularClasses`)
            return res.data;
        },
    })
    return (
        popularClass && <div>
         
          <h1 className='mt-8 text-center text-4xl font-bold'>Popular Classes</h1>
          <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">{
             popularClass?.map((item, index)=>(
          <div key={item._id} className="card mt-10 md:mt-16 bg-base-10 ">
             <figure><img title={`${item.className.toUpperCase()} class by ${item.instructorName.toUpperCase()} `} className='w-full md:h-[200px]' src={item.picture} alt={item.instructorName} /></figure>
          </div>
           ))
        }
         </div>
       </div>
     )
}

export default PopularClass