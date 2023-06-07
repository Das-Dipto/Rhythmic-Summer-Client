import React from 'react'
import bannerImgOne from '../assets/bannerImgOne.jpg'
import bannerImgTwo from '../assets/bannerImgTwo.jpg'
import bannerImgThree from '../assets/bannerImgThree.jpg'
import { Carousel } from 'flowbite-react'

const BannerSlider = () => {
  return (
    <>
<Carousel className='h-[65vh] bg-black'>
  <div className="relative banner flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <img src={bannerImgOne} className='w-full h-full' alt="" />
      <div className='top-20 absolute'>
         <h1 className='font-bold text-white text-3xl md:text-7xl text-center'>Make this <span className='text-success'>Summer Worthy</span></h1>
         <div className='btn-class w-full flex justify-center'>
            <button className='btn btn-success mt-14 text-center'>Join Now</button>
         </div>
      </div>
  </div>
  <div className="relative banner flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <img src={bannerImgTwo} className='w-full h-full' alt="" />
      <div className='top-20 absolute'>
         <h1 className='font-bold text-white text-3xl md:text-7xl text-center'> <span className='text-info'>Discover Music </span>in you</h1>
         <div className='btn-class w-full flex justify-center'>
            <button className='btn btn-info mt-14'>Find How</button>
         </div>
      </div>
  </div>
  <div className="relative banner flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <img src={bannerImgThree} className='w-full h-full' alt="" />
      <div className='top-20  absolute'>
         <h1 className='font-bold text-white text-3xl md:text-7xl text-center'>Let your <span className='text-warning'>Passsion Fly</span></h1>
      <div className='btn-class w-full flex justify-center'>
            <button className='btn btn-warning mt-14'>Explore</button>
         </div>
      </div>
  </div>
</Carousel>
    </>
  )
}

export default BannerSlider