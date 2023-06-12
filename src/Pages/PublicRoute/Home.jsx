import React from 'react'
import BannerSlider from '../../Component/BannerSlider'
import PopularClass from '../../Component/PopularClass'
import PopularInstructor from '../../Component/PopularInstructor'
import Partner from '../../Component/Partner'

const Home = () => {
  return (
    <>
     <BannerSlider/>
     <PopularClass/>
     <PopularInstructor/>
     <Partner/>
    </>
  )
}

export default Home