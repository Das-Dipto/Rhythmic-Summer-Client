
import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react'
import { Label, TextInput, Checkbox, Button } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { useLocation } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import useTitle from '../../Hooks/useTitle';



const UpdateClassInfo = () => {

    useTitle('Update ClassInfo')

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const params = useParams();
    console.log(params.id);
    const onSubmit = (data) => {
    const {instructorName, className, instructorEmail, price, seats } = data
    const updateItem = {
        instructorName,
        className, 
        instructorEmail,
        price: parseFloat(price), 
        seats
    }
   
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
       
        if (result.isConfirmed) {
          fetch(` https://server-a12.vercel.app/updateClass/${params.id}`,{
            method:'PUT',
            headers:{
              'content-type' : 'application/json'
            },
            body: JSON.stringify(updateItem)
          })
          .then((res)=>res.json())
          .then(data =>{
             if(data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully updated.',
                    showConfirmButton: false,
                    timer: 1500
                });
              refetch()
             };
             setTimeout(()=>{
                navigate('/InstructorDash/myClass');
              },700)
            //  console.log(data);
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
  }

   
    const {user} = useContext(AuthContext)
    const { refetch, data: requiredUsers = [] } = useQuery({
      queryKey: ['updateClass'],
      queryFn: async () => {
          const res = await axios.get(` https://server-a12.vercel.app/updateClassInfo/${params.id}`)
          return res.data;
      },
  })
   
  return (
    requiredUsers && <div className="login-box w-[65%] ms-28 mt-12  mx-auto bg-white p-8 border border-gray-300 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h1 className='text-2xl text-sky-500 font-semibold'>Create Class</h1>
                <div className="flex flex-col gap-4">
                  <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="className"
                          value="Class Name"
                        />
                      </div>
                      <TextInput
                        id="className"
                        type="text"
                        sizing="md"
                        name="className"
                        defaultValue={requiredUsers?.className}
                        {...register("className")}
                      />
                        {errors.className && <span className='text-red-600 font-semibold'>Class name is required</span>}
                  </div>
                
                <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="instructorName"
                          value="Instructor Name"
                        />
                      </div>
                      <TextInput
                        id="instructorName"
                        type="text"
                        sizing="md"
                        name="instructorName"
                        defaultValue={user?.displayName || user?.reloadUserInfo.screenName}
                        {...register("instructorName")}
                        readOnly
                      />
                </div>

                <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="instructorEmail"
                          value="Instructor Email"
                        />
                      </div>
                      <TextInput
                        id="instructorEmail"
                        type="text"
                        sizing="md"
                        name="instructorEmail"
                        defaultValue={user?.email}
                        {...register("instructorEmail")}
                        readOnly
                      />
                </div>

                <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="seats"
                          value="Available Seats"
                        />
                      </div>
                      <TextInput
                        id="seats"
                        type="number"
                        sizing="md"
                        name="seats"
                        defaultValue={requiredUsers?.seats}
                        {...register("seats")}
                      />
                        {errors.seats && <span className='text-red-600 font-semibold'>Need to mention available seats</span>}
                </div>

                <div>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="price"
                          value="Price"
                        />
                      </div>
                      <TextInput
                        id="price"
                        type="text"
                        sizing="md"
                        name="price"
                        defaultValue={requiredUsers?.price}
                        {...register("price")}
                      />
                        {errors.price && <span className='text-red-600 font-semibold'>Need to mention price for enrollment</span>}
                </div>
                 
                  
              </div>
              {/* <Link to='/InstructorDash/myClass'> */}
                <Button type="submit">
                  Update
                </Button>
              {/* </Link> */}
                </form>
</div>
  )
}

export default UpdateClassInfo