import React, { useState } from 'react'
import { Label, TextInput, Checkbox, Button } from 'flowbite-react'
import { NavLink, Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import Anim from '../../assets/RegisterAnim.json'

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className='w-full flex justify-around items-center flex-wrap'>
        <div className="lottie-anim mt-0 md:mt-28 md:me-15">
              <div style={{maxWidth:600}}>
                  <Lottie animationData={Anim} />
              </div>
          </div>
         <div className="login-box w-[85%]  mt-12 md:w-[40%] mx-auto bg-white p-8 border border-gray-300 rounded-lg">
               <form className="flex flex-col gap-4">
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
                                 />
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
                                 />
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
                             required={true}
                           />
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
                             required={true}
                           />
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
                           />
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