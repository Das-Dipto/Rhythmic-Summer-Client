import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';


const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const location = useLocation();
  const { refetch, data: allUsers = [] } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
        const res = await axios.get(` https://server-a12.vercel.app/getAllUsers`)
        return res.data;
    },
})

console.log(allUsers);
const signInUser = allUsers?.find((item, index)=> item?.email == user.email )
console.log(signInUser);
  
  if(signInUser?.role == 'admin'){
    return <Navigate to="/AdminDash" state={{from: location}} replace></Navigate>
  }

  else if(signInUser?.role == 'student'){
   return <Navigate to="/StudentDash" state={{from: location}} replace></Navigate>
  }

  else if(signInUser?.role == 'instructor'){
   return <Navigate to="/InstructorDash" state={{from: location}} replace></Navigate>
  }



}

export default Dashboard