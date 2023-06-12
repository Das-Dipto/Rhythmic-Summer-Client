import React, { useState, useContext } from 'react'
import { Label, TextInput, FileInput, Button } from 'flowbite-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../ContextProvider/AuthProvider';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const AddClass = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
  console.log(img_hosting_token);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

  const onSubmit = (data) => {
    const formData = new FormData();
 
    formData.append('image', data.file[0])

    fetch(img_hosting_url, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(imgResponse => {
        if(imgResponse.success){
            const imgURL = imgResponse.data.display_url;
            const {instructorName, className, instructorEmail, price, seats} = data;
            const newItem = {
              instructorName,
              className, 
              instructorEmail,
              price: parseFloat(price), 
              seats: parseInt(seats), 
              picture:imgURL, 
              status:'Pending',
              feedback: '',
              enrollment: parseInt(0)
            }
            console.log(newItem)
                  fetch(' https://server-a12.vercel.app/addClasses', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newItem)
                  })
                 .then(res => res.json())
                 .then(data => {
                    if (data.insertedId) {
                        // reset();
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Successfully created class.',
                          showConfirmButton: false,
                          timer: 1500
                        });
                        setTimeout(()=>{
                          navigate('/InstructorDash/myClass');
                        },1600)
                            
                        }
                    })
                  .catch(error => {console.log(error)})
          }
          else{
          
          }
      })

  
  }


  
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center my-5'>Instructor Dashboard-  Add Class</h1>
        <div className="login-box w-[65%] ms-28 mt-12  mx-auto bg-white p-8 border border-gray-300 rounded-lg">
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
                                        {...register("className",{ required: true })}
                                      />
                                        {errors.className && <span className='text-red-600 font-semibold'>Class name is required</span>}
                                  </div>
                                  <div
                                  className="max-w-md"
                                  id="fileUpload"
                                >
                                  <div className="mb-2 block">
                                    <Label
                                      htmlFor="file"
                                      value="Upload image"
                                    />
                                  </div>
                                  <FileInput
                                    helperText="A picture related to your designated classroom"
                                    id="file"
                                    name="file"
                                    {...register("file")}
                                  />
                                   {errors.file && <span className='text-red-600 font-semibold'>Need to upload class related image</span>}
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
                                        {...register("seats",{ required: true })}
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
                                        {...register("price",{ required: true })}
                                      />
                                        {errors.price && <span className='text-red-600 font-semibold'>Need to mention price for enrollment</span>}
                                </div>
                                 
                                  
                              </div>
                              {/* <Link to='/InstructorDash/myClass'> */}
                                <Button type="submit">
                                  Add Class
                                </Button>
                              {/* </Link> */}
                              </form>
        </div>
    </div>
  )
}

export default AddClass