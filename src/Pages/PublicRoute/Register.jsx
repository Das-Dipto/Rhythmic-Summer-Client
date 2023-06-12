import React, { useState, useContext } from 'react'
import { Label, TextInput, Checkbox, Button } from 'flowbite-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import Anim from '../../assets/RegisterAnim.json'
import { useForm } from "react-hook-form";
import { AuthContext } from "../../ContextProvider/AuthProvider";
import Swal from 'sweetalert2'
import useTitle from '../../Hooks/useTitle'

const Register = () => {

  useTitle('Register');

  const [errMessage, setErrMessage] = useState(``);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const onSubmit = (data) => {
    if(data.password1.toLowerCase() != data.password2.toLowerCase()){
      setErrMessage(`Password is not matching with confirming password!!! Please Try again.`)
      return
    }
    console.log(data.email.toLowerCase(), data.password1.toLowerCase())
    createUser(data.email.toLowerCase(), data.password1.toLowerCase())
    .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setErrMessage(``);

        updateUserProfile(data.name.toLowerCase(), data.photoURL)
            .then(() => {
                const saveUser = { 
                  name: data.name.toLowerCase(),
                  email: data.email.toLowerCase(),
                  photo: data.photoURL,
                  role:'student'
                 }

                fetch(' https://server-a12.vercel.app/allUsers', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            // reset();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setTimeout(()=>{
                              navigate('/');
                            },1600)
                            
                        }
                    })
            })
            .catch(error => console.log(error))
    })
  } 

  return (
    <>
      <div className='w-full flex justify-around items-center flex-wrap my-14'>
        <div className="lottie-anim mt-0 md:mt-28 md:me-15">
              <div style={{maxWidth:600}}>
                  <Lottie animationData={Anim} />
              </div>
          </div>
         <div className="login-box w-[85%]  mt-12 md:w-[40%] mx-auto bg-white p-8 border border-gray-300 rounded-lg">
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
               <h1 className='text-2xl font-semibold text-sky-500'>Register</h1>
               <div className="flex flex-col gap-4">
                             <div>
                                 <div className="mb-2 block">
                                   <Label
                                     htmlFor="base"
                                     value="Name"
                                   />
                                 </div>
                                 <TextInput
                                   id="base"
                                   type="text"
                                   sizing="md"
                                   name="name"
                                   {...register("name",{ required: true })}
                                 />
                                  {errors.name && <span className='text-red-600 font-semibold'>Name is required</span>}
                             </div>
                             <div>
                                 <div className="mb-2 block">
                                   <Label
                                     htmlFor="base"
                                     value="Email"
                                   />
                                 </div>
                                 <TextInput
                                   id="base"
                                   type="email"
                                   sizing="md"
                                   name="email"
                                   {...register("email",{ required: true })}
                                 />
                                  {errors.email && <span className='text-red-600 font-semibold'>Email is required</span>}
                             </div>
                         <div>
                           <div className="mb-2 block">
                             <Label
                               htmlFor="password1"
                               value="Password"
                             />
                           </div>
                           <TextInput
                             id="password1"
                             type={(isChecked) ? `text`: `password`}
                             name="password1"
                             {...register("password1",{ required: true, minLength: 6, maxLength: 20,  
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/ })}
                                />
                              {errors.password1?.type === 'required' && <span className="text-red-600">Password is required</span>}
                              {errors.password1?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                              {errors.password1?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 characters</span>}
                              {errors.password1?.type === 'pattern' && <span className="text-red-600">Password must have one Uppercase and one special character.</span>}
                         </div>
                        
                         <div>
                           <div className="mb-2 block">
                             <Label
                               htmlFor="password2"
                               value="Confirm Password"
                             />
                           </div>
                           <TextInput
                             id="password2"
                             type={(isChecked) ? `text`: `password`}
                             name="password2"
                             {...register("password2",{ required: true, minLength: 6, maxLength: 20,  
                              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/ })}
                              />
                            {errors.password2?.type === 'required' && <span className="text-red-600">Password is required</span>}
                            {errors.password2?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                            {errors.password2?.type === 'maxLength' && <span className="text-red-600">Password must be less than 20 characters</span>}
                            {errors.password2?.type === 'pattern' && <span className="text-red-600">Password must have one Uppercase and one special character.</span>}
                           
                         </div>

                         <div>
                           <div className="mb-2 block">
                             <Label
                               htmlFor="URL"
                               value="Photo URL"
                             />
                           </div>
                           <TextInput
                             id="URL"
                             type="text"
                             sizing="md"
                             name="photoURL"
                             {...register("photoURL",{ required: true })}
                           />
                             {errors.photoURL && <span className='text-red-600 font-semibold'>PhotoURL is required</span>}
                         </div>
                         
                         <div className=''>
                                <Checkbox
                                className='me-1'
                                 type="checkbox"
                                 id="remember"
                                 name="remember"
                                 onChange={handleCheckboxChange}/>
                                <Label htmlFor="remember">
                                  Show Password
                                </Label>
                         </div>
                         <p className='text-red-400 font-semibold'>{errMessage}</p>
                </div>
                   <Button className='mt-5 bg-sky-500'  type="submit">
                       Create an account
                   </Button>
                  
               </form>
               <p className='mt-6 flex justify-center'>Already have an account?<NavLink to="/login" className='text-sky-400 font-semibold ms-1 underline'> Login</NavLink></p>
         </div>
      </div>
    </>
  )
}

export default Register