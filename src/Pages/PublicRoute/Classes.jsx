import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const Classes = () => {
  const [data, setData] = useState()
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const { refetch, data: approvedClasses = [] } = useQuery({
    queryKey: ['approvedClasses'],
    queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/getApprovedClass`)
        return res.data;
    },
})

const { data: getRole= [] } = useQuery({
  queryKey: ['role', user?.email],
  queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/getRole?email=${user?.email}`)
      return res.data;
  },
})

const notify = () => toast.warn("You have to login first", {autoClose:700});
const handleSelect =(item) =>{
    if(user){
        const {picture, className, instructorName, price} = item;
        const selectedClassInfo = {
          picture,
          className,
          instructorName,
          price,
          addedBy:user?.email
        }
        fetch('http://localhost:5000/selectedClasses', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(selectedClassInfo)
        })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
              // reset();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Added to Select-cart',
                showConfirmButton: false,
                timer: 1500
              });
              // setTimeout(()=>{
              //   navigate('/StudentDash/selected');
              // },1600)    
              }
          })
        .catch(error => console.log(error))
    }
    else{
      notify();
      setTimeout(()=>{
        navigate('/login')
      },800)
    }
}
  return (
     approvedClasses && <div>
       <h1 className='mt-8 text-center text-4xl font-bold'>All Approved Classes</h1>
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
              <button
              disabled={getRole.role == 'student' ? false : true}
              onClick={()=>handleSelect(item)} className="btn btn-primary">Select</button>
            </div>
          </div>
        </div>
        ))
      }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Classes