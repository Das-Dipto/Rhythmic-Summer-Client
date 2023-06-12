import React from 'react'
import error from '../../assets/error.jpg'
import { Link } from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'

const Error = () => {
  return (
    <div className='error-container'>
        <div className="error-content w-[80%] mx-auto flex justify-start items-end h-full">
            <Link to="/">
                <button className='btn md:btn-outline btn-success mt-9'> <AiOutlineArrowLeft style={25}/>  Back to Home</button>
            </Link>
        </div>

    </div>
  )
}

export default Error