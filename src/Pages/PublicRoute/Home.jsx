import React from 'react'
import BannerSlider from '../../Component/BannerSlider'
import PopularClass from '../../Component/PopularClass'
import PopularInstructor from '../../Component/PopularInstructor'
import Partner from '../../Component/Partner'
import useTitle from '../../Hooks/useTitle'

const Home = () => {
 
  useTitle('Home')

  return (
    <div>
     <BannerSlider/>
     <PopularClass/>
     <PopularInstructor/>
     <Partner/>
    </div>
  )
}

export default Home