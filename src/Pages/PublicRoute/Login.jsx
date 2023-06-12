import React, { useState, useContext } from 'react'
import { Label, TextInput, Checkbox, Button } from 'flowbite-react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import { useForm } from "react-hook-form";
import Lottie from 'lottie-react'
import Anim from '../../assets/LoginAnim.json'
import { AuthContext } from '../../ContextProvider/AuthProvider';
import Swal from 'sweetalert2'

const Login = () => {
  const [errMessage, setErrMessage] = useState(``);
  const { signIn, user} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isChecked, setIsChecked] = useState(false);
    
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
      };

      const onSubmit = (data) => {
        console.log(data.email.toLowerCase(), data.password.toLowerCase())
        signIn(data.email.toLowerCase(), data.password.toLowerCase())
        .then(result => {
            const user = result.user;
            setErrMessage(``);
            console.log(user);
            Swal.fire({
                title: `Welcome ${user?.displayName.toUpperCase() || user?.reloadUserInfo.screenName.toUpperCase()}`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 1000
            });
            setTimeout(()=>{
              navigate(from, { replace: true });
            },1000)
        })
        .catch((err)=>{
           setErrMessage('Wrong email or password!!! Try Again ')
        })

      }
  return (
    <>
    <div className='flex justify-around items-center flex-wrap w-full'>
        <div className="lottie-anim mt-0 md:mt-28 md:me-15">
            <div style={{maxWidth:600}}>
                <Lottie animationData={Anim} />
            </div>
        </div>
        <div className="login-box w-[85%]  mt-12 md:w-[40%] mx-auto bg-white p-8 border border-gray-300 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <h1 className='text-2xl text-sky-500 font-semibold'>Login</h1>
                    <div className="flex flex-col gap-4">
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
                                    htmlFor="password"
                                    value='Password'
                                  />
                                </div>
                                <TextInput
                                  id="password"
                                  type={(isChecked) ? `text`: `password`}
                                  name="password"
                                  {...register("password", { required: true })}
                                  />
                                  {errors.password && <span className='text-red-600 font-semibold'>Valid password is required</span>}
                              </div>
                              <div className="flex justify-between items-center gap-2">
                                <div className='flex items-center gap-2'>
                                <Checkbox
                                 type="checkbox"
                                 id="remember"
                                 name="remember"
                                 onChange={handleCheckboxChange}/>
                                <Label htmlFor="remember">
                                  Show Password
                                </Label>
                                </div>
                              </div>
                              <p className='text-red-600 font-semibold'>{errMessage}</p>
                      
                                 
                     </div>
                        <Button className='mt-5 bg-sky-500' type="submit">
                            Login
                        </Button>
                    </form>
                    <p className='mt-6 flex justify-center'>Don't have an account?<NavLink to="/register" className='text-sky-500 font-semibold ms-1 underline'> Create an account</NavLink></p>
                    <button className='hover:bg-sky-500 ease-in-out duration-300 my-5 mx-auto flex justify-between items-center rounded-full p-2 font-semibold border border-gray-300'>
                        <FcGoogle style={{fontSize:"25px"}}/>
                        <span></span>
                    </button>
        </div>
    </div>
    </>
  )
}

export default Login